import User from "./User";

export interface Team {
  id?: string;
  name: string;
  members: Array<User>;
}

export interface Match {
  id?: string;
  sideA: {
    team: Team;
    score: {
      a: number;
      b: number;
    };
  };
  sideB: {
    team: Team;
    score: {
      a: number;
      b: number;
    };
  };
  isFinished: boolean;
  date: Date;
}

export default interface Tournament {
  id?: string;
  name: string;
  owner: User;
  teams: Array<Team>;
  matches: Array<Match>;
}