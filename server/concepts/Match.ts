import {
  MatchSideWithoutMS, MatchWithoutMS, TeamWithoutMS, TournamentApi,
} from '../../shared/types/Tournament';
// eslint-disable-next-line import/no-cycle
import TournamentRepository from '../database/repositories/TournamentRepository';
import AppError from '../utils/appError';

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

  public static async updateMatchScores(
    data: TournamentApi.UpdateMatchOutcomes,
    matchId: string,
    currentUserId: string,
  ) {
    const rawMatch = await TournamentRepository.getMatchById(matchId);

    if (!rawMatch) throw new AppError('Match does not exits', 404);

    const match = new Match(rawMatch);

    const assignedTeam = match.getAssignedTeam(currentUserId);

    if (!assignedTeam) throw new AppError('You are not authorized to update this match', 403);
    if (match.sideA.score.a !== -1) throw new AppError('The match result has already been reported', 400);

    match.sideA.score = {
      a: data.sideA,
      b: data.sideB,
    };
    match.isFinished = true;

    await TournamentRepository.updateMatch(matchId, match);
  }
}
