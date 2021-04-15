// User with db fields and fields yielded form azure
export default interface User extends UserWithoutMS {
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
// User in db
export interface UserWithoutMS {
  id: string;
  alias?: string | null;
}