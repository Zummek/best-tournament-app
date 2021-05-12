import {
  MatchScore,
  MatchWithoutMS,
  TeamWithoutMS,
} from '../../shared/types/Tournament';

interface INewMatch {
  teamA?: TeamWithoutMS | null;
  teamB?: TeamWithoutMS | null;
  childMatchAId?: string;
  childMatchBId?: string;
}

export default class Match implements MatchWithoutMS {
  id?: string | undefined;

  teamA: TeamWithoutMS | null;

  teamB: TeamWithoutMS | null;

  childMatchAId?: string;

  childMatchBId?: string;

  childTeamsAmount?: number;

  score: MatchScore;

  isFinished: boolean;

  date: string;

  constructor(data: MatchWithoutMS) {
    this.id = data.id;
    this.teamA = data.teamA;
    this.teamB = data.teamB;
    this.childMatchAId = data.childMatchAId;
    this.childMatchBId = data.childMatchBId;
    this.score = data.score;
    this.isFinished = data.isFinished;
    this.date = data.date;
  }

  public static getNewInstance(data?: INewMatch) {
    return new Match({
      teamA: null,
      teamB: null,
      ...data,
      score: {
        reportedByA: {
          a: -1,
          b: -1,
        },
        reportedByB: {
          a: -1,
          b: -1,
        },
        final: {
          a: -1,
          b: -1,
        },
      },
      isFinished: false,
      date: '1999-05-05', // Powinno byc nadpisane przy generowaniu dat
    });
  }

  public getAssignedTeam(userId: string) {
    if (this.teamA && this.teamB) {
      for (let i = 0; i < this.teamA?.members.length; i++) {
        if (this.teamA.members[i].id === userId) return 'teamA';
      }
      for (let i = 0; i < this.teamB.members.length; i++) {
        if (this.teamB.members[i].id === userId) return 'teamB';
      }
    }

    return false;
  }

  public getWinner() {
    if (!this.isFinished) return null;

    if (this.score.final.a > this.score.final.b) return this.teamA as TeamWithoutMS;
    if (this.score.final.b > this.score.final.a) return this.teamA as TeamWithoutMS;

    return 'draw';
  }
}
