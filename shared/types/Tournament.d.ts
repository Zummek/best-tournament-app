import User from "./User";

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
