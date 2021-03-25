import User from "./User";
 
export interface Team {
  id?: string
  name: string;
  members: Array<User>; 
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
  ownerMId: string;
  teams:  Array<Team>; 
  matches: Array<Match>;
}
