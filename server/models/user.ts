/* eslint-disable @typescript-eslint/no-unused-vars */
import IUser from '../../shared/types/User';

export default class User implements IUser {
  constructor(
    public microsoftId: string,
    public alias: string,
  ) {}
}
