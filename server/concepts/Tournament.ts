import tournamentGenerator from 'tournament-generator';
import ITournament, {
  MatchWithoutMS, TeamWithoutMS, TournamentApi, TournamentWihtoutMS, Team as ITeam, Match as IMatch,
} from '../../shared/types/Tournament';
import User from '../../shared/types/User';
import TeamRepository from '../database/repositories/TeamRepository';
// eslint-disable-next-line import/no-cycle
import TournamentRepository from '../database/repositories/TournamentRepository';
import AppError from '../utils/appError';
import Match from './Match';
import MSOrganization from './MSOrganization';

export default class Tournament implements TournamentWihtoutMS {
  _id?: string;

  name: string;

  ownerId: string;

  teams: TeamWithoutMS[];

  matches: MatchWithoutMS[];

  constructor(data: Tournament) {
    this._id = data._id;
    this.name = data.name;
    this.ownerId = data.ownerId;
    this.teams = data.teams;
    this.matches = data.matches instanceof Match
      ? data.matches : data.matches.map((match) => new Match(match));
  }

  public static async create(data: TournamentApi.Create, ownerId: string) {
    const teams = await TeamRepository.createMany(data.teams);
    const matches = Tournament.generateMatches(teams);

    return TournamentRepository.create({
      name: data.name,
      ownerId,
      teams,
      matches,
    });
  }

  private static generateMatches(teams: TeamWithoutMS[]): Match[] {
    const { data } = tournamentGenerator(teams, { type: 'single-round' });

    return data.map((match) => Match.getInstanceBasedOnTeams({
      teamA: match.homeTeam,
      teamB: match.awayTeam,
    }));
  }

  public static async updateMatchOutcomes(
    data: TournamentApi.UpdateMatchOutcomes,
    matchId: string,
    currentUserId: string,
  ) {
    const rawMatch = await TournamentRepository.getMatchById(matchId);

    if (!rawMatch) throw new AppError('Match does not exits', 404);

    const match = new Match(rawMatch);

    const assignedTeam = match.getAssignedTeam(currentUserId);

    if (!assignedTeam) throw new AppError('You are not authorized to update this match', 403);
    if (match.sideA.score.a !== -1) throw new AppError('The match result has already been reported', 400);

    match.sideA.score = {
      a: data.sideA,
      b: data.sideB,
    };
    await TournamentRepository.updateMatch(matchId, match);
  }

  public static async enrichWithMSUsers(
    tournament: Tournament,
    token: string,
    allUsersPrepared?: User[],
  ): Promise<ITournament> {
    let allUsers: User[] = [];

    if (allUsersPrepared) allUsers = allUsersPrepared;
    else allUsers = await MSOrganization.getAllUsers(token);

    const getUserById = (id: string): User => {
      const user = allUsers.find((u) => u.id === id);

      // TODO: poniższa linijka nie powinna miec prawa bytu ale w przypadku gdy
      // nie przechowujemy userów wszystko może się stać - do przemyślenia
      if (!user) { throw new AppError('Something went wrong', 500); }

      return user;
    };

    const enrichedTeams: ITeam[] = tournament.teams.map((team) => {
      const newTeam = team;

      newTeam.members = team.members.map((member) => ({
        ...member,
        ...getUserById(member.id),
      }));

      return newTeam as ITeam;
    });

    const enrichedMatches: IMatch[] = tournament.matches.map((match) => {
      const newMatch = match;

      match.sideA.team.members = match.sideA.team.members.map((member) => ({
        ...member,
        ...getUserById(member.id),
      }));
      match.sideB.team.members = match.sideB.team.members.map((member) => ({
        ...member,
        ...getUserById(member.id),
      }));

      return newMatch as IMatch;
    });

    const enrichedTournament: ITournament = {
      ...tournament,
      owner: getUserById(tournament.ownerId),
      teams: enrichedTeams,
      matches: enrichedMatches,
    };

    return enrichedTournament;
  }

  public static async enrichTournamentsWithMSUsers(
    tournaments: Tournament[],
    token: string,
  ): Promise<ITournament[]> {
    const allUsers = await MSOrganization.getAllUsers(token);
    const enrichedTournaments = [];

    for (let i = 0; i < tournaments.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      enrichedTournaments.push(await Tournament.enrichWithMSUsers(tournaments[i], token, allUsers));
    }

    return enrichedTournaments;
  }
}
