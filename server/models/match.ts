/* eslint-disable @typescript-eslint/no-unused-vars */
import { Match as IMatch } from '../../shared/types/Tournament';
import Team from './team';

export default class Match implements IMatch {
  constructor(
    public sideA: {
      team: Team;
      score: {
        a: number;
        b: number;
      },
    },
    public sideB: {
      team: Team;
      score: {
        a: number;
        b: number;
      },
    },
    public isFinished: boolean,
    public date: Date,
  ) {}
}
