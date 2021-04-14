import TournamentModel, { MatchDocument, TournamentDocument } from '../models/TournamentModel';
import TeamModel from '../models/TeamModel';
import { toTeamDb, toTeam, TeamDb } from './TeamRepository';
import { TournamentWihtoutMS, MatchWithoutMS, MatchSideWithoutMS } from '../../../shared/types/Tournament';
import AppError from '../../utils/appError';

interface MatchSideDB extends Omit<MatchSideWithoutMS, 'team'>{
  team: TeamDb,
}
interface MatchDb extends Omit<MatchWithoutMS, 'id' | 'sideA' | 'sideB'> {
  _id?:string,
  sideA: MatchSideDB,
  sideB: MatchSideDB
}
function toMatchDb(match: MatchWithoutMS) : MatchDb {
  const matchDb : MatchDb = {
    _id: match.id,
    sideA: {
      team: toTeamDb(match.sideA.team),
      score: {
        a: match.sideA.score.a,
        b: match.sideA.score.b,
      },
    },
    sideB: {
      team: toTeamDb(match.sideB.team),
      score: {
        a: match.sideB.score.a,
        b: match.sideB.score.b,
      },
    },
    isFinished: match.isFinished,
  };
  return matchDb;
}
function toMatch(matchDoc: MatchDocument) : MatchWithoutMS {
  const match : MatchWithoutMS = {
    id: matchDoc._id.toString(),
    sideA: {
      team: toTeam(matchDoc.sideA.team),
      score: {
        a: matchDoc.sideA.score.a,
        b: matchDoc.sideA.score.b,
      },
    },
    sideB: {
      team: toTeam(matchDoc.sideB.team),
      score: {
        a: matchDoc.sideA.score.a,
        b: matchDoc.sideA.score.b,
      },
    },
    isFinished: matchDoc.isFinished,
  };
  return match;
}
interface TournamentDb extends Omit<TournamentWihtoutMS, 'id' | 'teams' | 'matches'> {
  _id?: string,
  teams: TeamDb[],
  matches: MatchDb[]
}
function toTournamentDb(t: TournamentWihtoutMS) : TournamentDb {
  const tDb : TournamentDb = {
    _id: t.id,
    name: t.name,
    ownerId: t.ownerId,
    teams: t.teams.map((team) => toTeamDb(team)),
    matches: t.matches.map((match) => toMatchDb(match)),
  };
  return tDb;
}
function toTournament(tourDoc: TournamentDocument) : TournamentWihtoutMS {
  const tournament : TournamentWihtoutMS = {
    id: tourDoc._id.toString(),
    ownerId: tourDoc.ownerId,
    name: tourDoc.name,
    teams: tourDoc.teams.map((teamDoc) => toTeam(teamDoc)),
    matches: tourDoc.matches.map((matchDoc) => toMatch(matchDoc)),
  };
  return tournament;
}

export default class TournamentRepository {
  public static async create(tournament: TournamentWihtoutMS) {
    if (tournament.id) { throw new AppError('New tournament should not have id', 400); }
    tournament.teams.forEach((team) => {
      if (!team.id) { throw new AppError('All teams should have ids.', 400); }
    });
    tournament.matches.forEach((match) => {
      if (!match.teamA.id || !match.teamB.id) { throw new AppError('All teams in matches entries should have ids', 400); }
    });
    const tDoc = await TournamentModel.create(toTournamentDb(tournament));
    const tour = await TournamentRepository.getById(tDoc._id);
    if (!tour) { throw new AppError('Error while creating tournament', 400); }
    return tour;
  }

  public static async updateMatch(match: MatchWithoutMS) {
    if (!match.id) throw new AppError('Provided match does not contain id', 400);
    const matchDb = toMatchDb(match);
    const tDoc: TournamentDocument | null = await TournamentModel.findOneAndUpdate(
      { 'matches._id': matchDb._id },
      {
        $set: {
          'matches.$': matchDb,
        },
      },
      { new: true },
    ).exec();
    if (!tDoc) throw new AppError('Attempting to update a non-existent match', 400);
    return toTournament(tDoc);
  }

  public static getAll = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const totalRows = await TournamentModel.aggregate([{
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    }]);
    const tDocs: TournamentDocument[] = await TournamentModel.find().skip(skip).limit(pageSize).exec();
    const tournaments: TournamentWihtoutMS[] = tDocs.map((tDoc) => toTournament(tDoc));
    return { totalRows: totalRows[0].count, tournaments };
  };

  public static getById = async (id: string) => {
    const tDoc: TournamentDocument | null = await TournamentModel.findById(id).exec();
    if (!tDoc) return null;
    return toTournament(tDoc);
  };

  public static async getMatchById(matchId: string) {
    const tDoc = await TournamentModel.findOne({ 'matches._id': matchId }).exec();
    if (!tDoc) return null;
    const matchDoc = tDoc.matches.find((match) => match._id === matchId);
    if (!matchDoc) return null;
    return toMatch(matchDoc);
  }

  public static async delete(id: string) {
    const tDoc = await TournamentModel.findById(id).exec();
    if (!tDoc) throw new AppError('Can not delete tournament which does not exist', 400);
    const session = await TournamentModel.startSession();
    await session.withTransaction(async () => {
      tDoc.teams.forEach(async (team) => {
        await TeamModel.findByIdAndDelete(team._id).exec();
      });
      await tDoc.deleteOne();
    });
    session.endSession();
  }
}
