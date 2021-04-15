import User, { UserWithoutMS } from "../User";
export * as TournamentApi from "./apiInterface";

export interface Team {
  id?: string;
  name: string;
  members: User[];
}
// in db
export interface TeamWithoutMS extends Omit<Team, "members"> {
  members: UserWithoutMS[];
}

export interface Score {
  a: number;
  b: number;
}

export interface MatchScore {
  reportedByA: Score;
  reportedByB: Score;
  final: Score
}

export interface Match {
  id?: string;
  teamA: Team;
  teamB: Team;
  score: MatchScore;
  isFinished: boolean;
  // date: Date;
}

export interface MatchWithoutMS extends Omit<Match, "teamA" | "teamB"> {
  teamA: TeamWithoutMS;
  teamB: TeamWithoutMS;
}

export default interface Tournament {
  id?: string;
  name: string; 
  owner: User;
  teams: Team[];
  matches: Match[];
}
// in db
export interface TournamentWithoutMS
  extends Omit<Tournament, "owner" | "teams" | "matches"> {
  ownerId: string;
  teams: TeamWithoutMS[];
  matches: MatchWithoutMS[];
}
