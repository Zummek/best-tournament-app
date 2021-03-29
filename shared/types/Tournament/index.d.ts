import User from "../User";
export * as TournamentApi from "./apiInterface";

export interface Team {
  id?: string;
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
  id?: string;
  sideA: MatchSide;
  sideB: MatchSide;
  isFinished: boolean;
  // date: Date;
}

export default interface Tournament {
  id?: string;
  name: string;
  ownerMSId: string;
  teams: Team[];
  matches: Match[];
}
