import User from "./User";
import mongoose, { Schema, Document, Types } from 'mongoose';


export interface Team {
  name: string;
  members: Array<User>; 
}

export interface Match {
  rivals: {
    teamA: Types.ObjectId | Team;
    teamB: Types.ObjectId | Team;
  };
  score: {
    teamA: number | null;
    teamB: number | null;
  };
  date: Date;
}

export default interface Tournament {
  name: string;
  ownerMicrosoftId: string;
  teams: Array<Types.ObjectId> |  Array<Team>;
  matches: Array<Match>;
}
