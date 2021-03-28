import { Match as IMatch, MatchSide } from 'app/../shared/types/Tournament';

export default class Match implements IMatch {
  id?: string | undefined;
  sideA: MatchSide;
  sideB: MatchSide;
  isFinished: boolean;
  // date: Date;

  constructor(data: IMatch) {
    this.id = data.id;
    this.sideA = data.sideA;
    this.sideB = data.sideB;
    this.isFinished = data.isFinished;
    // this.date = data.date;
  }
}
