import Tournament, { PointsPerTeam } from 'app/../shared/types/Tournament';
import { UpdateMatchOutcomes } from 'app/../shared/types/Tournament/apiInterface';
import User from 'app/../shared/types/User';
import { Create as tournamentCreate } from 'app/../shared/types/Tournament/apiInterface';

export interface AuthLoginResponse {
  data: Location;
}

export interface GetLogoResponse {
  data: {
    logo: string;
  };
}

export interface GetUsersResponse {
  data: {
    users: User[];
  };
}

export interface GetUserPhotoResponse {
  data: {
    photo: string;
  };
}

export interface GetTournamentResponse {
  data: {
    tournament: Tournament;
  };
}
export interface getTournamentsResponse {
  data: {
    totalRows: number;
    tournaments: Tournament[];
  };
}
export interface GetPointsPerTeamResponse {
  data: {
    pointsPerTeam: PointsPerTeam[];
  };
}

export type CreateTournamentPayload = tournamentCreate;

export interface CreateTournamentResponse {
  data: {
    id: string;
  };
}

export type UpdateTournamentMatchPayload = UpdateMatchOutcomes;
