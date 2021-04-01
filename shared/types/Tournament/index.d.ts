import User from "../User";
export * as TournamentApi from "./apiInterface";

export interface Team {
  _id?: string;
  name: string;
  members: User[];
}

export interface MatchSide {
  team: Team;
  score: {
    a: number;
    b: number;
  };
}

export interface Match {
  _id?: string;
  sideA: MatchSide;
  sideB: MatchSide;
  isFinished: boolean;
  // date: Date;
}

export default interface Tournament {
  _id?: string;
  name: string;
  ownerMSId: string;
  teams: Team[];
  matches: Match[];
}
