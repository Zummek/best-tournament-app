import mongoose, { Schema, Types, Model } from 'mongoose';
import Tournament, { Match, Team } from '../../../shared/types/Tournament';
import { TeamDocument } from './teamModel';

const MatchSchema = new Schema({
  rivals: {
    teamA: { type: Types.ObjectId, ref: 'Team' },
    teamB: { type: Types.ObjectId, ref: 'Team' },
  },
  score: {
    teamA: Number,
    teamB: Number,
  },
  date: Date,
});

const TournamentSchema = new Schema<TournamentDocument, TournamentModel>({
  name: String,
  ownerMicrosoftId: String,
  teams: [{ type: Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
});

interface TournamentBaseDocument extends Tournament, mongoose.Document {
  teams: Types.Array<Types.ObjectId> | Types.Array<Team>;
  matches: Types.Array<Match>;
}

export interface TournamentDocument extends TournamentBaseDocument {
  teams: Types.Array<TeamDocument['_id']>
  matches: Types.Array<{
    rivals:{
      teamA: TeamDocument['_id'],
      teamB: TeamDocument['_id'], },
    score: {
      teamA: number,
      teamB: number, },
    date: Date;
  }>
}

export interface TournamentPopulatedDocument extends TournamentBaseDocument {
  teams: Types.Array<TeamDocument>;
  matches: Types.Array<{
    rivals:{
      teamA: TeamDocument,
      teamB: TeamDocument, },
    score: {
      teamA: number,
      teamB: number, };
    date: Date;
  }>
}

export type TournamentModel = Model<TournamentDocument>;

export default mongoose.model<TournamentDocument, TournamentModel>('Tournament', TournamentSchema);
