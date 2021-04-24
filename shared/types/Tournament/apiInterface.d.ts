export interface Create {
  name: string;
  teams: CreateTeam[];
  type: "single-elimination" | "round-robin";
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
