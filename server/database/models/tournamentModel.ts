import mongoose, { Schema, Types, Model } from 'mongoose';
import ITournament, { Match as IMatch, Team } from '../../../shared/types/Tournament';
import { TeamDocument } from './teamModel';

export interface Match extends Omit<IMatch, 'sideA' | 'sideB'> {
  sideA : { team: Team | Types.ObjectId };
  sideB : { team: Team | Types.ObjectId };
}

export interface Tournament extends Omit<ITournament, 'teams' | 'matches'>{
  teams: Array<Team> | Array<Types.ObjectId>;
  matches: Array<Match>;
}

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
  date: Date,
});

const TournamentSchema = new Schema<TournamentDocument, TournamentModel>({
  name: Schema.Types.String,
  ownerMicrosoftId: Schema.Types.String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  matches: [MatchSchema],
});

interface TournamentBaseDocument extends Tournament, mongoose.Document {
  teams: Types.Array<Team> | Types.Array<Types.ObjectId> ;
  matches: Types.Array<Match>;
}

export interface TournamentDocument extends TournamentBaseDocument {
  teams: Types.Array<TeamDocument['_id']>
  matches: Types.Array<{
    sideA: { team: TeamDocument['_id'] };
    sideB: { team: TeamDocument['_id'] };
    date: Date,
  }>,
}

export interface TournamentPopulatedDocument extends TournamentBaseDocument {
  teams: Types.Array<TeamDocument>;
  matches: Types.Array<{
    sideA: { team: TeamDocument };
    sideB: { team: TeamDocument };
    date: Date,
  }>,
}

export type TournamentModel = Model<TournamentDocument>;

export default mongoose.model<TournamentDocument, TournamentModel>('Tournament', TournamentSchema);
