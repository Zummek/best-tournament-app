import tournamentGenerator from 'tournament-generator';
import ITournament, { Team, TournamentApi } from '../../shared/types/Tournament';
import TeamRepository from '../database/repositories/TeamRepository';
import TournamentRepository from '../database/repositories/TournamentRepository';
import Match from './Match';

export default class Tournament implements ITournament {
  id?: string;

  name: string;

  ownerMSId: string;

  teams: Team[];

  matches: Match[];

  constructor(data: ITournament) {
    this.id = data.id;
    this.name = data.name;
    this.ownerMSId = data.ownerMSId;
    this.teams = data.teams;
    this.matches = data.matches;
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

    return data.map((match) => new Match({
      teamA: match.homeTeam,
      teamB: match.awayTeam,
    }));
  }
}
