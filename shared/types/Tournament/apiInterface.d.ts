import {TournamentType} from './index'

export interface Create {
  name: string;
  teams: CreateTeam[];
  type: TournamentType
  //  w jakie dni tygodnia moga odbywac sie mecze
  //  ile meczy w ciagu dnia
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
