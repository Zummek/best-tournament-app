import mongoose, { Schema, Document } from 'mongoose';
import Tournament from '../../../shared/types/Tournament';

const MatchSchema = new Schema({
  sideA: {
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    score: {
      a: Schema.Types.Number,
      b: Schema.Types.Number,
    },
  },
  sideB: {
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    score: {
      a: Schema.Types.Number,
      b: Schema.Types.Number,
    },
  },
  date: Schema.Types.Date,
});

const TournamentSchema = new Schema({
  name: Schema.Types.String,
  ownerMicrosoftId: Schema.Types.String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
});

interface TournamentDocument extends Tournament, Document {}

export default mongoose.model<TournamentDocument>('Tournament', TournamentSchema);
