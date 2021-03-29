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

  constructor(data: IMatch) {
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
      if (this.sideA.team.members[i].MSId === userId) return 'sideA';
    }
    for (let i = 0; i < this.sideB.team.members.length; i++) {
      if (this.sideB.team.members[i].MSId === userId) return 'sideB';
    }

    return false;
  }
}
