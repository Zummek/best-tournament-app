import { Match as IMatch, MatchSide, Team } from '../../shared/types/Tournament';

interface INewMatch {
  teamA: Team;
  teamB: Team;
}

export default class Match implements IMatch {
  id?: string | undefined;

  sideA: MatchSide;

  sideB: MatchSide;

  isFinished: boolean;

  constructor(data: INewMatch) {
    this.sideA = {
      team: data.teamA,
      score: {
        a: -1,
        b: -1,
      },
    };
    this.sideB = {
      team: data.teamB,
      score: {
        a: -1,
        b: -1,
      },
    };
    this.isFinished = false;
  }
}
