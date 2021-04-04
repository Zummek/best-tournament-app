export interface AuthLoginResponse {
  data: Location;
}
export interface LogoResponse {
  data: {
    logo: string;
  };
}
interface OrgUser {
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string | null;
  mail: string | null;
  mobilePhone: string | null;
  officeLocation: string | null;
  preferredLanguage: string | null;
  surname: string;
  userPrincipalName: string;
  id: string;
}
export interface OrgUsersResponse {
  data: {
    users: OrgUser[];
  };
}
export interface OgUserPhotoResponse {
  data: {
    photo: unknown;
  };
}

export interface CreateTournamentPayload {
  name: string; // TODO: it is temporary as template
}
