export interface Create {
  name: string;
  teams: CreateTeam[];
}

export interface CreateTeam {
  name: string;
  members: {
    id: string;
  }[];
}

export interface UpdateMatchOutcomes {
  sideA: number;
  sideB: number;
}
