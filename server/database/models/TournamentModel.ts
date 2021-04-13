import mongoose, { Schema, Document } from 'mongoose';
import { TournamentWihtoutMS } from '../../../shared/types/Tournament';

const ScoreSchema = new Schema({
  a: { type: Schema.Types.Number, default: -1 },
  b: { type: Schema.Types.Number, default: -1 },
});

const MatchScoreSchema = new Schema({
  reportedByA: ScoreSchema,
  reportedByB: ScoreSchema,
  final: ScoreSchema,
});

const MatchSchema = new Schema({
  teamA: { type: Schema.Types.ObjectId, ref: 'Team', required: [true, 'Missing team'] },
  teamB: { type: Schema.Types.ObjectId, ref: 'Team', required: [true, 'Missing team'] },
  score: MatchScoreSchema,
  isFinished: Schema.Types.Boolean,
  // date: Schema.Types.Date,
});

const TournamentSchema = new Schema({
  name: { type: Schema.Types.String },
  ownerId: Schema.Types.String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
});

// query middlewares
// eslint-disable-next-line func-names
TournamentSchema.pre(/^find/, function (next) {
  this.populate('teams')
    .populate('matches.teamA')
    .populate('matches.teamB');
  next();
});

export default mongoose.model<TournamentWihtoutMS & Document>('Tournament', TournamentSchema);
