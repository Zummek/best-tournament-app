import TournamentModel from '../models/TournamentModel';
import TeamModel from '../models/TeamModel';
import { TournamentWihtoutMS } from '../../../shared/types/Tournament';
import AppError from '../../utils/appError';
// eslint-disable-next-line import/no-cycle
import Match from '../../concepts/Match';

export default class TournamentRepository {
  public static async create(tournament: TournamentWihtoutMS) {
    // Check if teams have ids, if teams in matches have ids
    // and if teams in matches are on teams list
    tournament.teams.forEach((team) => {
      if (!team._id) { throw new AppError('All teams should have ids.', 400); }
    });
    tournament.matches.forEach((match) => {
      if (!match.teamA._id || !match.teamB._id) { throw new AppError('All teams in matches entries should have ids', 400); }
    });

    return await TournamentModel.create(tournament);
  }

  public static async updateMatch(matchId: string, match: Match) {
    if (!matchId) throw new AppError('Provided match does not contain id', 400);

    const tournament = await TournamentModel.findOneAndUpdate(
      { 'matches._id': matchId },
      {
        $set: {
          'matches.$': match,
        },
      },
      { new: true },
    ).lean();

    return tournament;
  }

  public static getAll = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const totalRows = await TournamentModel.aggregate([{
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    }]);
    const tournaments: TournamentWihtoutMS[] = await TournamentModel.find().skip(skip).limit(pageSize).lean();

    return { totalRows: totalRows[0].count, tournaments };
  };

  private static getDocumentById = async (id: string) => {
    const tournamentDb = await TournamentModel.findById(id).exec();
    if (tournamentDb === null) throw new AppError('No tournament with such id', 400);
    return tournamentDb;
  };

  public static getById = async (id: string) => {
    const tournamentDb = await TournamentRepository.getDocumentById(id);
    return <TournamentWihtoutMS>tournamentDb;
  };

  public static async getMatchById(matchId: string) {
    const tournament = await TournamentModel.findOne({ 'matches._id': matchId }).lean();

    return tournament?.matches.find((match) => String(match._id) === matchId);
  }

  public static async delete(id: string) {
    const tournamentDb = await TournamentRepository.getDocumentById(id);
    tournamentDb.teams.forEach(async (team) => {
      await TeamModel.findByIdAndDelete(team._id).exec();
    });
    tournamentDb.deleteOne();
  }
}
