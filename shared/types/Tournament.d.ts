import User from "./User";

export interface Team {
  id: number;
  name: string;
  members: User[];
}

export interface Match {
  id: number;
  rivals: {
    teamA: Team;
    teamB: Team;
  };
  score: {
    teamA: number | null;
    teamB: number | null;
  };
  date: Date | null;
}

export default interface Tournament {
  name: string;
  owner: User;
  teams: Team[];
  matches: Match[];
}
