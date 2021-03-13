import User from "./User";
 
export interface Team {
  name: string;
  members: Array<User>; 
}

export interface Match {
  sideA: {
    team: Team; 
    score: {
      a: number;
      b: number;  
    },
  },
  sideB: {
    team: Team;  
    score: {
      a: number;
      b: number;  
    },
  },
  date: Date;
}

export default interface Tournament {
  name: string;
  ownerMicrosoftId: string;
  teams:  Array<Team>; 
  matches: Array<Match>;
}
