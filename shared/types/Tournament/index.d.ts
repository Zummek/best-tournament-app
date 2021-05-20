import User, { UserWithoutMS } from "../User";
export * as TournamentApi from "./apiInterface";

export interface Team {
  id?: string;
  name: string;
  members: User[];
}
export interface PointsPerTeam {
  name: string;
  wins: number;
  loses: number;
  draws: number;
  points: number;
}

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
  final: Score;
}

export interface Match {
  id?: string;
  teamA: Team | null;
  teamB: Team | null;
  childMatchAId?: string;
  childMatchBId?: string;
  score: MatchScore;
  isFinished: boolean;
  date: Date;
}

export interface MatchWithoutMS extends Omit<Match, "teamA" | "teamB"> {
  teamA: TeamWithoutMS | null;
  teamB: TeamWithoutMS | null;
}

export type TournamentType = "round-robin" | "single-elimination";

export default interface Tournament {
  id?: string;
  name: string;
  owner: User;
  teams: Team[];
  matches: Match[];
  isFinished: boolean;
  type: TournamentType;
  startDate: Date;
}

export interface TournamentWithoutMS
  extends Omit<Tournament, "owner" | "teams" | "matches"> {
  ownerId: string;
  teams: TeamWithoutMS[];
  matches: MatchWithoutMS[];
}
