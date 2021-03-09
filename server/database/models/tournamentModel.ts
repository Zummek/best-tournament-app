import mongoose, { Schema } from "mongoose";
import { normalize } from "node:path";
import userRouter from "../../routes/api/userRoutes";
import Tournament from "./../../../shared/types/Tournament";
import User from "./../../../shared/types/User";

const TournamentSchemaFields: Record<keyof Tournament, any> = {
  id: Number,
  name: String,
  owner: { id: String },
  teams: [
    {
      id: Number,
      name: String,
      members: [{ id: String }],
    },
  ],
  matches: [
    {
      id: Number,
      rivals: {
        teamA: {
          name: String,
          members: [{ id: String }],
        },
        teamB: {
          name: String,
          members: [{ id: String }],
        },
      },
      score: { teamA: Number, teamB: Number },
      date: Date,
    },
  ],
};

const TournamentSchema = new Schema(TournamentSchemaFields);