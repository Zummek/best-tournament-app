/* eslint-disable @typescript-eslint/no-unused-vars */
import { Team as ITeam } from '../../shared/types/Tournament';
import User from './user';

export default class Team implements ITeam {
  constructor(
    public name: string,
    public members: Array<User>,
  ) {}
}
