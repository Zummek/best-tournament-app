import mongoose, { Schema, Document } from 'mongoose';
import Tournament from '../../../shared/types/Tournament';

const { Types } = Schema;

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

const TournamentSchema = new Schema({
  name: String,
  ownerMicrosoftId: String,
  teams: [{ type: Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
});

interface TournamentDocument extends Tournament, Document{}
const TournamentModel = mongoose.model<TournamentDocument>('Tournament', TournamentSchema);

export default TournamentModel;

// middleware that allows to save match entry (in tournament document)
// only with teams associated with this particular tournament
TournamentSchema.pre<TournamentDocument>('save', function (next) {
  const err = new Error(`Particular team is not present on this tournament
therefore it can't play matches`);
  this.name = 'to do';

  next(err);
});
