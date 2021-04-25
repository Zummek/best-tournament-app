import { isValidObjectId } from 'mongoose';
import TournamentModel, { MatchDocument, TournamentDocument } from '../models/TournamentModel';
import TeamModel from '../models/TeamModel';
import { toTeamDb, toTeam, TeamDb } from './TeamRepository';
import { TournamentWithoutMS, MatchWithoutMS } from '../../../shared/types/Tournament';
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
  };
}

export default class TournamentRepository {
  public static async create(tournament: TournamentWithoutMS) {
    if (tournament.id) { throw new AppError('New tournament should not have id', 400); }
    tournament.teams.forEach((team) => {
      if (!team.id) { throw new AppError('All teams should have ids.', 400); }
    });

    tournament.matches.forEach((match) => {
      if (tournament.type === 'round-robin') {
        if (!match.teamA || !match.teamB) { throw new AppError('All matches should contain teams', 400); }
        if (!match.teamA.id || !match.teamB.id) { throw new AppError('All teams in matches entries should have ids', 400); }
      }

      if (match.id) { throw new AppError('All matches should not contain id', 400); }
    });

    const tDoc = await TournamentModel.create(toTournamentDb(tournament));
    const tour = await TournamentRepository.getById(tDoc._id);
    if (!tour) { throw new AppError('Error while creating tournament', 400); }
    return tour;
  }

  public static async updateMatch(match: MatchWithoutMS) {
    if (!match.id || !isValidObjectId(match.id)) throw new AppError('Provided match does not contain id', 400);
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
    const totalRows = await TournamentModel.aggregate([{
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    }]);
    const tDocs: TournamentDocument[] = await TournamentModel.find().skip(skip).limit(pageSize).exec();
    const tournaments: TournamentWithoutMS[] = tDocs.map((tDoc) => toTournament(tDoc));
    let totalRowsCount = 0;
    if (totalRows[0]) totalRowsCount = totalRows[0].count;
    return { totalRows: totalRowsCount, tournaments };
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
    if (!isValidObjectId(id)) return null;
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
