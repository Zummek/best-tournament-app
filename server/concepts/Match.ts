import {
  MatchScore,
  MatchWithoutMS,
  TeamWithoutMS,
} from '../../shared/types/Tournament';

interface INewMatch {
  teamA: TeamWithoutMS;
  teamB: TeamWithoutMS;
}

export default class Match implements MatchWithoutMS {
  _id?: string | undefined;

  teamA: TeamWithoutMS;

  teamB: TeamWithoutMS;

  score: MatchScore;

  isFinished: boolean;

  constructor(data: MatchWithoutMS) {
    this.teamA = data.teamA;
    this.teamB = data.teamB;
    this.score = data.score;
    this.isFinished = data.isFinished;
  }

  public static getInstanceBasedOnTeams(data: INewMatch) {
    return new Match({
      teamA: data.teamA,
      teamB: data.teamB,
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
    });
  }

  public getAssignedTeam(userId: string) {
    for (let i = 0; i < this.teamA.members.length; i++) {
      if (this.teamA.members[i].id === userId) return 'teamA';
    }
    for (let i = 0; i < this.teamB.members.length; i++) {
      if (this.teamB.members[i].id === userId) return 'teamB';
    }

    return false;
  }
}
