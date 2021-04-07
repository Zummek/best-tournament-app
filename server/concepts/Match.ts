import { MatchSideWithoutMS, MatchWithoutMS, TeamWithoutMS } from '../../shared/types/Tournament';

interface INewMatch {
  teamA: TeamWithoutMS;
  teamB: TeamWithoutMS;
}

export default class Match implements MatchWithoutMS {
  _id?: string | undefined;

  sideA: MatchSideWithoutMS;

  sideB: MatchSideWithoutMS;

  isFinished: boolean;

  constructor(data: MatchWithoutMS) {
    this.sideA = data.sideA;
    this.sideB = data.sideB;
    this.isFinished = data.isFinished;
  }

  public static getInstanceBasedOnTeams(data: INewMatch) {
    return new Match({
      sideA: {
        team: data.teamA,
        score: {
          a: -1,
          b: -1,
        },
      },
      sideB: {
        team: data.teamB,
        score: {
          a: -1,
          b: -1,
        },
      },
      isFinished: false,
    });
  }

  public getAssignedTeam(userId: string) {
    for (let i = 0; i < this.sideA.team.members.length; i++) {
      if (this.sideA.team.members[i].id === userId) return 'sideA';
    }
    for (let i = 0; i < this.sideB.team.members.length; i++) {
      if (this.sideB.team.members[i].id === userId) return 'sideB';
    }

    return false;
  }
}
