import Tournament from 'app/../shared/types/Tournament';
import { UpdateMatchOutcomes } from 'app/../shared/types/Tournament/apiInterface';
import User from 'app/../shared/types/User';

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
    photo: unknown;
  };
}

export interface getTournamentResponse {
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

export interface CreateTournamentPayload {
  name: string; // TODO: it is temporary as template
}

export type UpdateTournamentMatchPayload = UpdateMatchOutcomes;
