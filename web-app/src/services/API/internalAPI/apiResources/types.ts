import { AxiosResponse } from 'axios';

export interface AuthLoginResponse {
  data: Location;
}
export interface LogoResponse extends AxiosResponse {
  logo: string;
}

export interface CreateTournamentPayload {
  name: string; // TODO: it is temporary as template
}
