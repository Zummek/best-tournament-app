import TournamentModel from '../models/TournamentModel';
import Tournament, { Match } from '../../../shared/types/Tournament';
import AppError from '../../utils/appError';
// import TeamModel from '../models/TeamModel';

export default class TournamentRepository {
  public static create =
  async (tournament: Tournament) => {
    // Check if teams have ids, if teams in matches have ids
    // and if teams in matches are on teams list
    tournament.teams.forEach((team) => {
      if (!team.id) { throw new AppError('All teams should have ids.', 400); }
    });
    tournament.matches.forEach((match) => {
      if (!match.sideA.team.id || !match.sideB.team.id) { throw new AppError('All teams in matches entries should have ids', 400); }
    });
    return await TournamentModel.create(tournament);
  };

  public static updateMatch = async (match: Match) => {
    if (!match.id) throw new Error('Provided match does not contain id');
    // $set is a filter that tells mongo to update only match with specified id
    const tournament: Tournament | null = await TournamentModel.findOneAndUpdate(
      { 'matches._id': match.id },
      {
        $set: {
          'matches.$': match,
        },
      },
      { new: true },
    );
    return tournament;
  };

  public static getAll = async () => TournamentModel.find();

  public static getById = async (idSearch: string) => TournamentModel.findById(idSearch);
}
