import mongoose, { Schema, Document } from 'mongoose';
import Tournament from '../../../shared/types/Tournament';

const MatchSideSchema = new Schema({
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: [true, 'Missing team'] },
  score: {
    a: { type: Schema.Types.Number, default: -1 },
    b: { type: Schema.Types.Number, default: -1 },
  },
});

const MatchSchema = new Schema({
  sideA: MatchSideSchema,
  sideB: MatchSideSchema,
  isFinished: Schema.Types.Boolean,
  // date: Schema.Types.Date,
});

const TournamentSchema = new Schema({
  name: { type: Schema.Types.String /* unique: true */ },
  ownerMSId: Schema.Types.String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
});

// query middlewares
// eslint-disable-next-line func-names
TournamentSchema.pre(/^find/, function (next) {
  this.populate('teams')
    .populate('matches.sideA.team')
    .populate('matches.sideB.team');
  next();
});

export default mongoose.model<Tournament & Document>('Tournament', TournamentSchema);
