import mongoose, { Schema, Document } from "mongoose";
import { normalize } from "node:path";
import userRouter from "../../routes/api/userRoutes";
import Tournament from "./../../../shared/types/Tournament";
import User from "./../../../shared/types/User";

// https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
// https://mongoosejs.com/docs/subdocs.html

const UserSchema = new Schema({
  id: String,
});

const TeamSchema = new Schema({
  name: String,
  members: [UserSchema],
});

const MatchSchema = new Schema({
  rivals: { teamA: TeamSchema, teamB: TeamSchema },
  score: { teamA: Number, teamB: Number},
  date: Date
});

const TournamentSchema = new Schema({
  name: String,
  owner: UserSchema,
  teams: [TeamSchema],
  matches: [MatchSchema]
});

export interface TournamentModel extends Tournament, Document{};

// Exports the model (I suppose that every import will create model) <- that's wrong
const Tournament = mongoose.model<TournamentModel>('Tournament', TournamentSchema);
export default Tournament;



