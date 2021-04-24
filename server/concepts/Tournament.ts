import tournamentGenerator from 'tournament-generator';
import ITournament, {
  MatchWithoutMS, TeamWithoutMS, TournamentApi, TournamentWithoutMS, Team as ITeam, Match as IMatch,
} from '../../shared/types/Tournament';
import User from '../../shared/types/User';
import TeamRepository from '../database/repositories/TeamRepository';
// eslint-disable-next-line import/no-cycle
import TournamentRepository from '../database/repositories/TournamentRepository';
import AppError from '../utils/appError';
import Match from './Match';
import MSOrganization from './MSOrganization';

export default class Tournament implements TournamentWithoutMS {
  id?: string;

  name: string;

  ownerId: string;

  teams: TeamWithoutMS[];

  matches: MatchWithoutMS[];

  isFinished: boolean;

  type: 'single-elimination' | 'round-robin';

  constructor(data: Tournament) {
    this.id = data.id;
    this.name = data.name;
    this.ownerId = data.ownerId;
    this.teams = data.teams;
    this.matches = data.matches instanceof Match
      ? data.matches : data.matches.map((match) => new Match(match));
    this.isFinished = data.isFinished;
    this.type = data.type;
  }

  public static async create(data: TournamentApi.Create, ownerId: string) {
    const teams = await TeamRepository.createMany(data.teams);
    if (teams.length !== data.teams.length) throw new AppError('Failed to register all teams', 400);

    let newMatches = [];
    if (data.type === 'round-robin') newMatches = Tournament.generateRoundRobinMatches(teams);
    else newMatches = Tournament.generateEmptyMatches(teams.length - 1);

    const tournament = await TournamentRepository.create({
      name: data.name,
      ownerId,
      teams,
      matches: newMatches,
      isFinished: false,
      type: data.type,
    });

    if (data.type === 'single-elimination') {
      Tournament.setSingleEliminationMatches(tournament);
      // TODO: update tournament's matches after changes => update tournament?
      // TournamentRepository.update(tournament);
    }

    return tournament;
  }

  private static setSingleEliminationMatches(tournament: Tournament) {
    const { matches, teams } = tournament;
    let minPowerTwo = 1;
    for (let i = 0; minPowerTwo < teams.length; i++) minPowerTwo = 2 ** i;
    let roundAmount = 0;
    do {
      roundAmount++;
    } while (2 ** roundAmount < teams.length);
    const firstRoundTeamsAmount = teams.length * 2 - minPowerTwo;
    const teamsToAssign = [...teams];
    const matchesForFirstRound = matches.slice(matches.length - firstRoundTeamsAmount / 2);
    matches[0].childTeamsAmount = tournament.teams.length;

    for (let i = 0; i < roundAmount - 1; i++) {
      for (let ii = 0; ii < 2 ** i; ii++) {
        const { childTeamsAmount } = matches[2 ** i - 1 + ii];
        if (childTeamsAmount) {
          const temp = childTeamsAmount / 2;
          const childTeamsAmountInA = Math.ceil(temp);
          const childTeamsAmountInB = Math.floor(temp);

          if (childTeamsAmountInA === 1) {
            matches[2 ** i - 1 + ii].teamA = teamsToAssign.shift();
          } else {
            let assignedMatch: MatchWithoutMS;
            if (i === roundAmount - 2) assignedMatch = matchesForFirstRound.shift() as Match;
            else assignedMatch = matches[(2 ** i - 1 + ii) * 2 + 1];

            assignedMatch.childTeamsAmount = childTeamsAmountInA;
            matches[2 ** i - 1 + ii].childMatchAId = assignedMatch.id;
            if (childTeamsAmountInA === 2 && i === roundAmount - 2) {
              assignedMatch.teamA = teamsToAssign.shift();
              assignedMatch.teamB = teamsToAssign.shift();
            }
          }

          if (childTeamsAmountInB === 1) {
            matches[2 ** i - 1 + ii].teamB = teamsToAssign.shift();
          } else {
            let assignedMatch: MatchWithoutMS;
            if (i === roundAmount - 2) assignedMatch = matchesForFirstRound.shift() as Match;
            else assignedMatch = matches[(2 ** i - 1 + ii) * 2 + 2];

            assignedMatch.childTeamsAmount = childTeamsAmountInB;
            matches[2 ** i - 1 + ii].childMatchBId = assignedMatch.id;
            if (childTeamsAmountInB === 2 && i === roundAmount - 2) {
              assignedMatch.teamA = teamsToAssign.shift();
              assignedMatch.teamB = teamsToAssign.shift();
            }
          }
        }
      }
    }
  }

  public static async delete(tournamentId: string, currentUserId : string) {
    const tournament = await TournamentRepository.getById(tournamentId);
    if (!tournament) throw new AppError('Tournament with such ID does not exist', 404);
    if (currentUserId !== tournament.ownerId) {
      throw new AppError(
        'You are not an owner of given tournament. Only owner of specified tournament can delete it',
        403,
      );
    }

    await TournamentRepository.delete(tournamentId);
  }

  private static generateRoundRobinMatches(teams: TeamWithoutMS[]): Match[] {
    const { data } = tournamentGenerator(teams, { type: 'single-round' });

    return data.map((match) => Match.getNewInstance({
      teamA: match.homeTeam,
      teamB: match.awayTeam,
    }));
  }

  private static generateEmptyMatches(matchAmount: number): Match[] {
    const newMatches = [];

    for (let i = 0; i < matchAmount; i++) {
      newMatches.push(Match.getNewInstance({}));
    }

    return newMatches;
  }

  public static async updateMatchScores(
    data: TournamentApi.UpdateMatchOutcomes,
    tournamentId: string,
    matchId: string,
    currentUserId: string,
  ) {
    if (data.teamA < 0 || data.teamB < 0) throw new AppError('Score can not be negative', 404);

    const tournament = await TournamentRepository.getById(tournamentId);
    if (!tournament) throw new AppError('Tournament does not exits', 404);

    const rawMatch = tournament?.matches.find((match) => String(match.id) === matchId);
    if (!rawMatch) throw new AppError('Match does not exits', 404);

    const match = new Match(rawMatch);

    const hasOwnerRights = tournament.ownerId === currentUserId;
    const assignedTeam = match.getAssignedTeam(currentUserId);

    if (hasOwnerRights) {
      match.score.final = {
        a: data.teamA,
        b: data.teamB,
      };
      match.isFinished = true;
    } else if (assignedTeam) {
      if (assignedTeam === 'teamA') {
        if (match.score.reportedByA.a !== -1) throw new AppError('The match result has already been reported', 400);
        match.score.reportedByA = {
          a: data.teamA,
          b: data.teamB,
        };
      } else if (assignedTeam === 'teamB') {
        if (match.score.reportedByB.a !== -1) throw new AppError('The match result has already been reported', 400);
        match.score.reportedByB = {
          a: data.teamA,
          b: data.teamB,
        };
      }
      if (match.score.reportedByA === match.score.reportedByB) {
        match.score.final = {
          a: match.score.reportedByA.a,
          b: match.score.reportedByA.b,
        };
        match.isFinished = true;
      }
    } else {
      throw new AppError('You are not authorized to update this match', 403);
    }

    await TournamentRepository.updateMatch(match);
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

      if (match.teamA) {
        match.teamA.members = match.teamA.members.map((member) => ({
          ...member,
          ...getUserById(member.id),
        }));
      }
      if (match.teamB) {
        match.teamB.members = match.teamB.members.map((member) => ({
          ...member,
          ...getUserById(member.id),
        }));
      }

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
    tournaments: TournamentWithoutMS[],
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
