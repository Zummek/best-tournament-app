import User from './User';

export interface Team {
  _id?: string;
  name: string;
  members: User[];
}

export interface XDDDD {
  id: string;
  rivals: {
    teamA: Team;
    teamB: Team;
  };
  score: {
    teamA: number | null;
    teamB: number | null;
  };
}

export default interface Tournament {
  _id?: string;
  name: string;
  owner: User;
  participants: Team[];
  matches: XDDDD[];
}
