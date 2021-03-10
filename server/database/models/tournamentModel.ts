import mongoose, { Schema, Document } from "mongoose";
import { normalize } from "node:path";
import userRouter from "../../routes/api/userRoutes";
import Tournament from "./../../../shared/types/Tournament";
import User from "./../../../shared/types/User";



const UserSchema = new Schema({
  _id: String,
});

const TeamSchema = new Schema({
  _id: Number,
  name: String,
  members: [UserSchema],
});

const MatchSchema = new Schema({
  _id: Number,
  rivals: { teamA: TeamSchema, teamB: TeamSchema },
  score: { teamA: Number, teamB: Number},
  date: Date
});

const TournamentSchema = new Schema({
  _id: Number,
  name: String,
  owner: UserSchema,
  teams: [TeamSchema],
  matches: [MatchSchema]
});

//https://stackoverflow.com/questions/37926481/mongoose-typescript-exporting-model-interface
export interface TournamentModel extends Tournament, Document{
  _id: number;
}


// Exports the model and returns TournamentModel interface
const Tournament =  mongoose.model<TournamentModel>('Tournament', TournamentSchema);
export default Tournament;