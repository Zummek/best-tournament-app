import TournamentModel from '../models/TournamentModel';
import Tournament from '../../../shared/types/Tournament';
import AppError from '../../utils/appError';
import Match from '../../concepts/Match';

export default class TournamentRepository {
  public static async create(tournament: Tournament) {
    // Check if teams have ids, if teams in matches have ids
    // and if teams in matches are on teams list
    tournament.teams.forEach((team) => {
      if (!team._id) { throw new AppError('All teams should have ids.', 400); }
    });
    tournament.matches.forEach((match) => {
      if (!match.sideA.team._id || !match.sideB.team._id) { throw new AppError('All teams in matches entries should have ids', 400); }
    });
    return await TournamentModel.create(tournament);
  }

  public static async updateMatch(matchId: string, match: Match) {
    if (!matchId) throw new AppError('Provided match does not contain id', 400);

    // const set: { [key: string]: string; } = {};
    // Object.keys(match).forEach((field) => {
    //   if (field !== 'id') {
    //     set[`matches.$.${field}`] = `${match[field as keyof Match]}`;
    //   }
    // });

    const tournament = await TournamentModel.findOneAndUpdate(
      { 'matches._id': matchId },
      {
        $set: {
          'matches.$': match,
        },
      },
      { new: true },
    );
    return tournament;
  }

  public static getAll = async () => TournamentModel.find();

  public static getById = async (id: string) => TournamentModel.findById(id);

  public static async getMatchById(matchId: string) {
    const tournament = await TournamentModel.findOne({ 'matches._id': matchId });

    return tournament?.matches.find((match) => String(match._id) === matchId);
  }
}
