import { isValidObjectId } from 'mongoose';
import TournamentModel, { MatchDocument, TournamentDocument } from '../models/TournamentModel';
import TeamModel from '../models/TeamModel';
import { toTeamDb, toTeam, TeamDb } from './TeamRepository';
import { TournamentWithoutMS, MatchWithoutMS, TeamWithoutMS } from '../../../shared/types/Tournament';
import AppError from '../../utils/appError';

interface MatchDb extends Omit<MatchWithoutMS, 'id' | 'teamA' | 'teamB'> {
  _id?:string,
  teamA: TeamDb | null,
  teamB: TeamDb | null,
}

function toMatchDb(match: MatchWithoutMS) : MatchDb {
  const matchDb : MatchDb = {
    _id: match.id,
    teamA: match.teamA ? toTeamDb(match.teamA) : null,
    teamB: match.teamB ? toTeamDb(match.teamB) : null,
    childMatchAId: match.childMatchAId,
    childMatchBId: match.childMatchBId,
    score: match.score,
    isFinished: match.isFinished,
    date: match.date,
  };
  return matchDb;
}

function toMatch(matchDoc: MatchDocument) : MatchWithoutMS {
  const match : MatchWithoutMS = {
    id: matchDoc._id.toString(),
    teamA: matchDoc.teamA ? toTeam(matchDoc.teamA) : null,
    teamB: matchDoc.teamB ? toTeam(matchDoc.teamB) : null,
    childMatchAId: matchDoc.childMatchAId,
    childMatchBId: matchDoc.childMatchBId,
    score: matchDoc.score,
    isFinished: matchDoc.isFinished,
    date: matchDoc.date,
  };
  return match;
}

interface TournamentDb extends Omit<TournamentWithoutMS, 'id' | 'teams' | 'matches'> {
  _id?: string,
  teams: TeamDb[],
  matches: MatchDb[]
}

function toTournamentDb(t: TournamentWithoutMS) : TournamentDb {
  return {
    _id: t.id,
    name: t.name,
    ownerId: t.ownerId,
    teams: t.teams.map((team) => toTeamDb(team)),
    matches: t.matches.map((match) => toMatchDb(match)),
    isFinished: t.isFinished,
    type: t.type,
    startDate: t.startDate,
  };
}

function toTournament(tDoc: TournamentDocument) : TournamentWithoutMS {
  return {
    id: tDoc._id.toString(),
    ownerId: tDoc.ownerId,
    name: tDoc.name,
    teams: tDoc.teams.map((teamDoc) => toTeam(teamDoc)),
    matches: tDoc.matches.map((matchDoc) => toMatch(matchDoc)),
    isFinished: tDoc.isFinished,
    type: tDoc.type,
    startDate: tDoc.startDate,
  };
}
export interface MatchRoundRobinCreate extends Omit<MatchWithoutMS, 'id' | 'childMatchAId' | 'childMatchBId'>{
  teamA: Required<TeamWithoutMS>; // teams id required and teams not null since they are known from the begining
  teamB: Required<TeamWithoutMS>;
}

type MatchSingleEliminationCreate = Omit<MatchWithoutMS, 'id'>; // matches can have null teams and childMatchesIds

interface TournamentRoundRobinCreate extends Omit<TournamentWithoutMS, 'id'>{ // no tournament id
  teams: Required<TeamWithoutMS>[]; // teams id required and teams not null
  matches: MatchRoundRobinCreate[];
}
interface TournamentSingleEliminationCreate extends Omit<TournamentWithoutMS, 'id'>{ // no tournament id
  teams: Required<TeamWithoutMS>[]; // teams id required and teams not null
  matches: MatchSingleEliminationCreate[];
}
export default class TournamentRepository {
  public static async create(tournament: TournamentRoundRobinCreate | TournamentSingleEliminationCreate) {
    const tDoc = await TournamentModel.create(toTournamentDb(tournament));
    const tour = await TournamentRepository.getById(tDoc._id);
    if (!tour) { throw new AppError('Error while creating tournament', 400); }
    return tour;
  }

  public static async updateMatch(match: MatchWithoutMS) {
    if (!match.id || !isValidObjectId(match.id)) throw new AppError('Provided match does not contain id', 404);
    const matchDb = toMatchDb(match);
    const tournamentDocument = await TournamentModel.findOneAndUpdate(
      { 'matches._id': matchDb._id },
      {
        $set: {
          'matches.$': matchDb,
        },
      },
      { new: true },
    ).exec();
    if (!tournamentDocument) throw new AppError('Match does not exist', 400);
    return toTournament(tournamentDocument);
  }

  public static getAll = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const totalRowsData = await TournamentModel.aggregate([{
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    }]);
    const tDocs: TournamentDocument[] = await TournamentModel.find().skip(skip).limit(pageSize).exec();
    const tournaments: TournamentWithoutMS[] = tDocs.map((tDoc) => toTournament(tDoc));
    let totalRows = 0;
    if (totalRowsData[0]) totalRows = totalRowsData[0].count;
    return { totalRows, tournaments };
  };

  public static getAllActive = async (): Promise<TournamentWithoutMS[]> => {
    const tDocs: TournamentDocument[] = await TournamentModel.find().where('isFinished').equals(false).exec();
    return tDocs.map((tDoc) => toTournament(tDoc));
  };

  public static getById = async (id: string) => {
    if (!isValidObjectId(id)) return null;
    const tDoc: TournamentDocument | null = await TournamentModel.findById(id).exec();
    if (!tDoc) return null;
    return toTournament(tDoc);
  };

  public static async getMatchById(matchId: string) {
    if (!isValidObjectId(matchId)) return null;
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

  public static async updateMatches(tournament: TournamentWithoutMS) {
    if (!tournament.id) throw new AppError('Tournament should contain id', 400);

    const results = [];
    for (let i = 0; i < tournament.matches.length; i++) {
      results.push(TournamentRepository.updateMatch(tournament.matches[i]));
    }
    await Promise.all(results);

    const updatedTournament = TournamentRepository.getById(tournament.id);
    if (!updatedTournament) throw new AppError('Error while updating matches', 400);

    return updatedTournament;
  }

  public static async markAsFinished(tournamentId: string) {
    const tournamentDoc: TournamentDocument | null = await TournamentModel.findById(tournamentId).exec();
    if (!tournamentDoc) throw new AppError('No tournament with such id', 404);
    if (tournamentDoc.isFinished) throw new AppError('Tournament is already finished', 400);

    tournamentDoc.isFinished = true;
    const updatedTournament = await tournamentDoc.save();
    return toTournament(updatedTournament);
  }
}
