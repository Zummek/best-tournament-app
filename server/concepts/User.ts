import IUser, { MSUser } from '../../shared/types/User';

export default class User implements IUser {
  id: string;

  alias?: string | null;

  firstName: string;

  lastName: string;

  email: string;

  avatarSrc?: string;

  constructor(data: MSUser) {
    this.id = data.id;
    this.alias = undefined;
    this.firstName = data.givenName;
    this.lastName = data.surname;
    this.email = data.userPrincipalName;
    this.avatarSrc = undefined;
  }
}
