import TournamentModel from '../models/TournamentModel';
import TeamModel from '../models/TeamModel';
import { TournamentWihtoutMS, MatchWithoutMS } from '../../../shared/types/Tournament';
import AppError from '../../utils/appError';

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
    const tournamentWihtoutMS : TournamentWihtoutMS = await TournamentModel.create(tournament);
    return tournamentWihtoutMS;
  }

  public static async updateMatch(match: MatchWithoutMS) {
    if (!match._id) throw new AppError('Provided match does not contain id', 400);
    const tournament: TournamentWihtoutMS | null = await TournamentModel.findOneAndUpdate(
      { 'matches._id': match._id },
      {
        $set: {
          'matches.$': match,
        },
      },
      { new: true },
    ).exec();
    if (!tournament) throw new AppError('Attempting to update a non-existent match', 400);
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
    const tournaments: TournamentWihtoutMS[] = await TournamentModel.find().skip(skip).limit(pageSize).lean()
      .exec();
    return { totalRows: totalRows[0].count, tournaments };
  };

  public static getById = async (id: string) => {
    const tournament: TournamentWihtoutMS | null = await TournamentModel.findById(id).lean().exec();
    return tournament;
  };

  public static async getMatchById(matchId: string) {
    const tournamentDoc = await TournamentModel.findOne({ 'matches._id': matchId }).exec();
    if (!tournamentDoc) return null;
    const matchWithoutMS = tournamentDoc.matches.find((match) => match._id === matchId);
    if (matchWithoutMS === undefined) return null; // This will never happen but ensures that function returns null | MatchWithoutMS
    return matchWithoutMS;
  }

  public static async delete(id: string) {
    const tournamentDb = await TournamentRepository.getDocumentById(id);
    // add transaction
    const session = await TournamentModel.startSession();
    await session.withTransaction(async () => {
      tournamentDb.teams.forEach(async (team) => {
        await TeamModel.findByIdAndDelete(team._id).exec();
      });
      tournamentDb.deleteOne();
    });
    session.endSession();
  }

  private static getDocumentById = async (id: string) => {
    const tournamentDb = await TournamentModel.findById(id).exec();
    if (tournamentDb === null) throw new AppError('No tournament with such id', 400);
    return tournamentDb;
  };
}
