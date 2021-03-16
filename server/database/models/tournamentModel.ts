import mongoose, { Schema } from 'mongoose';
import Match from '../../models/match';
import Tournament from '../../models/tournament';

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
  ownerMicrosoftId: Schema.Types.String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
});

MatchSchema.loadClass(Match);
TournamentSchema.loadClass(Tournament);

export default mongoose.model('Tournament', TournamentSchema);
