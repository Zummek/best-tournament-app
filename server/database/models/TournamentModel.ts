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
  teamA: { type: Schema.Types.ObjectId, ref: 'Team' },
  teamB: { type: Schema.Types.ObjectId, ref: 'Team' },
  childMatchAId: { type: Schema.Types.String },
  childMatchBId: { type: Schema.Types.String },
  score: MatchScoreSchema,
  isFinished: { type: Schema.Types.Boolean },
  date: Schema.Types.Date,
});

const TournamentSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'No tournament name was specified'],
    minLength: [3, 'Tournament name should be at least 3 characters long'],
    maxLength: [
      40,
      'Tournament name cannot exceed 40 characters',
    ] /* unique: true */,
  },
  ownerId: Schema.Types.String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
  isFinished: { type: Schema.Types.Boolean },
  type: {
    type: Schema.Types.String,
    enum: ['round-robin', 'single-elimination'],
    required: [true, 'Missing tournament type'],
  },
  startDate: Schema.Types.Date,
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
export interface MatchDocument extends Omit<MatchWithoutMS, 'id' | 'teamA' | 'teamB' >, Document {
  teamA: TeamDocument,
  teamB: TeamDocument,
}
export interface TournamentDocument extends Omit<TournamentWithoutMS, 'id' | 'teams' | 'matches' >, Document {
  teams: TeamDocument[],
  matches: MatchDocument[]
}
// export const MatchModel = mongoose.model<MatchDocument>('Match', MatchSchema);
export default mongoose.model<TournamentDocument>('Tournament', TournamentSchema);
