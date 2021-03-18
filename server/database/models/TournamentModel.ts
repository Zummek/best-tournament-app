import mongoose, { Schema, Document } from 'mongoose';
import Tournament from '../../../shared/types/Tournament';

const MatchSchema = new Schema({
  sideA: {
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: [true, 'Missing sideA.team'] },
    score: {
      a: { type: Schema.Types.Number, default: -1 },
      b: { type: Schema.Types.Number, default: -1 },
    },
  },
  sideB: {
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: [true, 'Missing sideB.team'] },
    score: {
      a: { type: Schema.Types.Number, default: -1 },
      b: { type: Schema.Types.Number, default: -1 },
    },
  },
  isFinished: Schema.Types.Boolean,
  date: Schema.Types.Date,
});

const TournamentSchema = new Schema({
  name: Schema.Types.String,
  ownerMId: Schema.Types.String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
});

export default mongoose.model<Tournament & Document>('Tournament', TournamentSchema);
