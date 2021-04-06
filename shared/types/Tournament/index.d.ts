import User, { UserWithoutMS } from "../User";
export * as TournamentApi from "./apiInterface";

export interface Team {
  _id?: string;
  name: string;
  members: User[];
}

export interface TeamWithoutMS extends Omit<Team, "members"> {
  members: UserWithoutMS[];
}

export interface MatchSide {
  team: Team;
  score: {
    a: number;
    b: number;
  };
}

export interface MatchSideWithoutMS extends Omit<MatchSide, "team"> {
  team: TeamWithoutMS;
}

export interface Match {
  _id?: string;
  sideA: MatchSide;
  sideB: MatchSide;
  isFinished: boolean;
  // date: Date;
}

export interface MatchWithoutMS extends Omit<Match, "sideA" | "sideB"> {
  sideA: MatchSideWithoutMS;
  sideB: MatchSideWithoutMS;
}

export default interface Tournament {
  _id?: string;
  name: string;
  owner: User;
  teams: Team[];
  matches: Match[];
}

export interface TournamentWihtoutMS
  extends Omit<Tournament, "owner" | "teams" | "matches"> {
  ownerId: string;
  teams: TeamWithoutMS[];
  matches: MatchWithoutMS[];
}
