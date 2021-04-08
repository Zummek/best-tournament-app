import Tournament from 'app/../shared/types/Tournament';
import { UpdateMatchOutcomes } from 'app/../shared/types/Tournament/apiInterface';
import User from 'app/../shared/types/User';
import {Create as tournamentCreate} from 'app/../shared/types/Tournament/apiInterface';

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateTournamentPayload extends tournamentCreate {}

export interface CreateTournamentResponse {
  data: {
    _id: string;
  };
}

export type UpdateTournamentMatchPayload = UpdateMatchOutcomes;
