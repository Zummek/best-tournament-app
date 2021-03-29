import tournamentGenerator from 'tournament-generator';
import ITournament, { Team, TournamentApi } from '../../shared/types/Tournament';
import TeamRepository from '../database/repositories/TeamRepository';
// eslint-disable-next-line import/no-cycle
import TournamentRepository from '../database/repositories/TournamentRepository';
import AppError from '../utils/appError';
import Match from './Match';

export default class Tournament implements ITournament {
  id?: string;

  name: string;

  ownerMSId: string;

  teams: Team[];

  matches: Match[];

  constructor(data: Tournament) {
    this.id = data.id;
    this.name = data.name;
    this.ownerMSId = data.ownerMSId;
    this.teams = data.teams;
    this.matches = data.matches instanceof Match
      ? data.matches : data.matches.map((match) => new Match(match));
  }

  public static async create(data: TournamentApi.Create, ownerId: string) {
    const teams = await TeamRepository.createMany(data.teams);
    const matches = Tournament.generateMatches(teams);

    return TournamentRepository.create({
      name: data.name,
      ownerMSId: ownerId,
      teams,
      matches,
    });
  }

  private static generateMatches(teams: Team[]): Match[] {
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

    // TODO: czy nie da się tego zrobić z poziomu TournamentModel?
    // Zeby mongoose zwracało od razu instancje klasy
    const match = new Match(rawMatch);

    const assignedTeam = match.getAssignedTeam(currentUserId);

    if (!assignedTeam) throw new AppError('You are not authorized to update this match', 401);
    if (match.sideA.score.a !== -1) throw new AppError('The match result has already been reported', 400);

    match.sideA.score = {
      a: data.sideA,
      b: data.sideB,
    };
    await TournamentRepository.updateMatch(matchId, match);

    // await TournamentRepository.updateMatch(matchId, {
    //   sideA: {
    //     score: {
    //       a: data.sideA,
    //       b: data.sideB,
    //     },
    //   },
    // });
  }
}
