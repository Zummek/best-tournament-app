import mongoose, { Schema, Document } from 'mongoose';
import { MatchWithoutMS, TournamentWithoutMS } from '../../../shared/types/Tournament';
import { TeamDocument } from './TeamModel';

const ScoreSchema = new Schema({
  a: { type: Schema.Types.Number, default: -1 },
  b: { type: Schema.Types.Number, default: -1 },
}, { _id: false });

const MatchScoreSchema = new Schema({
  reportedByA: ScoreSchema,
  reportedByB: ScoreSchema,
  final: ScoreSchema,
}, { _id: false });

const MatchSchema = new Schema({
  // _id
  teamA: { type: Schema.Types.ObjectId, ref: 'Team', required: [true, 'Missing team'] },
  teamB: { type: Schema.Types.ObjectId, ref: 'Team', required: [true, 'Missing team'] },
  score: MatchScoreSchema,
  isFinished: Schema.Types.Boolean,
  // date: Schema.Types.Date,
});

const TournamentSchema = new Schema({
  // _id
  name: { type: Schema.Types.String },
  ownerId: Schema.Types.String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
  isFinished: { type: Boolean },
});

// query middlewares
// eslint-disable-next-line func-names
TournamentSchema.pre(/^find/, function (next) {
  this.populate('teams')
    .populate('matches.teamA')
    .populate('matches.teamB');
  next();
});

// interface MatchScoreDocument extends Omit<MatchScore, 'teamA' | 'teamB'>, Document {
//   teamA: TeamDocument,
//   teamB: TeamDocument,
// }
export interface MatchDocument extends Omit<MatchWithoutMS, 'id' | 'teamA' | 'teamB'>, Document {
  teamA: TeamDocument,
  teamB: TeamDocument,
}
export interface TournamentDocument extends Omit<TournamentWithoutMS, 'id' | 'teams' | 'matches' >, Document {
  teams: TeamDocument[],
  matches: MatchDocument[]
}
// export const MatchModel = mongoose.model<MatchDocument>('Match', MatchSchema);
export default mongoose.model<TournamentDocument>('Tournament', TournamentSchema);
