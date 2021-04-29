import {TournamentType} from './index'

export interface Create {
  name: string;
  teams: CreateTeam[];
  type: TournamentType | null;
}

export interface CreateTeam {
  name: string;
  members: {
    id: string;
  }[];
}

export interface UpdateMatchOutcomes {
  teamA: number;
  teamB: number;
}
