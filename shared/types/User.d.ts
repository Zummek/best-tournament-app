export default interface User {
  id: string;
  alias?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  avatarSrc?: string;
}

export interface MSUser {
  id: string;
  givenName: string;
  surname: string;
  userPrincipalName: string;
}

export interface UserWithoutMS extends Pick<User, "id" | "alias"> {}
