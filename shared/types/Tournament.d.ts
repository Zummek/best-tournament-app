import User from "./User";
import mongoose, { Schema, Document } from 'mongoose';

export interface Team {
  name: string;
  members: User[];
}

export interface Match {
  rivals: {
    teamA: Team;
    teamB: Team;
  };
  score: {
    teamA: number;
    teamB: number;
  };
  date: Date;
}

export default interface Tournament  {
  name: string;
  ownerMicrosoftId: string;
  teams: Team[];
  matches: Match[];
}
