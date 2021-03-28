export interface Create {
  name: string;
  teams: CreateTeam[];
}

export interface CreateTeam {
  name: string;
  members: {
    MSId: string;
  }[];
}
