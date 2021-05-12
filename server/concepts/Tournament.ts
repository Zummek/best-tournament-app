/* eslint-disable no-continue */
import tournamentGenerator from 'tournament-generator';
import _ from 'lodash';
import schedule from 'node-schedule';
import ITournament, {
  MatchWithoutMS, TeamWithoutMS, TournamentApi, TournamentWithoutMS, PointsPerTeam, Team as ITeam, Match as IMatch, TournamentType,
} from '../../shared/types/Tournament';
import User from '../../shared/types/User';
import TeamRepository from '../database/repositories/TeamRepository';
// eslint-disable-next-line import/no-cycle
import TournamentRepository from '../database/repositories/TournamentRepository';
import AppError from '../utils/appError';
import Match from './Match';
import Slack from './Slack';
import MSOrganization from './MSOrganization';
import isToday from '../utils/isToday';
import todaysMatchMessage from '../utils/slackMessages/todaysMatchMessage';

interface SingleEliminationMatchCreator extends MatchWithoutMS {
  childTeamsAmount?: number;
}

export default class Tournament implements TournamentWithoutMS {
  id?: string;

  name: string;

  ownerId: string;

  teams: TeamWithoutMS[];

  matches: MatchWithoutMS[];

  isFinished: boolean;

  type: TournamentType;

  startDate: Date;

  constructor(data: Tournament) {
    this.id = data.id;
    this.name = data.name;
    this.ownerId = data.ownerId;
    this.teams = data.teams;
    this.matches = data.matches instanceof Match
      ? data.matches : data.matches.map((match) => new Match(match));
    this.isFinished = data.isFinished;
    this.type = data.type;
    this.startDate = data.startDate;
  }

  public static async create(data: TournamentApi.Create, ownerId: string) {
    const teams = await TeamRepository.createMany(data.teams);
    if (teams.length !== data.teams.length) throw new AppError('Failed to register all teams', 400);

    if (data.type === 'round-robin') {
      const newMatches = Tournament.generateRoundRobinMatches(teams);
      const tournament = await TournamentRepository.createRoundRobin({
        name: data.name,
        ownerId,
        teams,
        matches: Tournament.generateRoundRobinMatches(teams),
        isFinished: false,
        type: data.type,
      });
    } else {
      newMatches = Tournament.generateEmptySingleEliminationMatches(teams.length - 1);
    }
    const tournament = await TournamentRepository.createRoundRobin({
      name: data.name,
      ownerId,
      teams,
      matches: newMatches,
      isFinished: false,
      type: data.type,
      startDate: new Date(), // Powinno byc ustawione na dzien
    });

    if (data.type === 'single-elimination') {
      Tournament.setSingleEliminationMatches(tournament);
      TournamentRepository.updateMatches(tournament); // Update is setting
    }

    return tournament;
  }

  private static setSingleEliminationMatches(tournament: Tournament) {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    // eslint-disable-next-line prefer-destructuring
    const matches: SingleEliminationMatchCreator[] = tournament.matches;
    const { teams } = tournament;
    let minPowerTwo = 1;
    for (let i = 0; minPowerTwo < teams.length; i++) minPowerTwo = 2 ** i;
    let roundAmount = 0;
    do {
      roundAmount++;
    } while (2 ** roundAmount < teams.length);
    const firstRoundTeamsAmount = teams.length * 2 - minPowerTwo;
    const teamsToAssign = _.shuffle(teams);
    const matchesForFirstRound = matches.slice(matches.length - firstRoundTeamsAmount / 2);
    matches[0].childTeamsAmount = teams.length;

    for (let i = 0; i < roundAmount - 1; i++) {
      for (let ii = 0; ii < 2 ** i; ii++) {
        const { childTeamsAmount } = matches[2 ** i - 1 + ii];
        if (childTeamsAmount) {
          const childTeamsAmountInA = Math.ceil(childTeamsAmount / 2);
          const childTeamsAmountInB = Math.floor(childTeamsAmount / 2);

          if (childTeamsAmountInA === 1) {
            matches[2 ** i - 1 + ii].teamA = teamsToAssign.shift()!;
          } else {
            let assignedMatch: SingleEliminationMatchCreator;
            if (i === roundAmount - 2) assignedMatch = matchesForFirstRound.shift() as Match;
            else assignedMatch = matches[(2 ** i - 1 + ii) * 2 + 1];

            assignedMatch.childTeamsAmount = childTeamsAmountInA;
            matches[2 ** i - 1 + ii].childMatchAId = assignedMatch.id;
            if (childTeamsAmountInA === 2 && i === roundAmount - 2) {
              assignedMatch.teamA = teamsToAssign.shift()!;
              assignedMatch.teamB = teamsToAssign.shift()!;
            }
          }

          if (childTeamsAmountInB === 1) {
            matches[2 ** i - 1 + ii].teamB = teamsToAssign.shift()!;
          } else {
            let assignedMatch: SingleEliminationMatchCreator;
            if (i === roundAmount - 2) assignedMatch = matchesForFirstRound.shift() as Match;
            else assignedMatch = matches[(2 ** i - 1 + ii) * 2 + 2];

            assignedMatch.childTeamsAmount = childTeamsAmountInB;
            matches[2 ** i - 1 + ii].childMatchBId = assignedMatch.id;
            if (childTeamsAmountInB === 2 && i === roundAmount - 2) {
              assignedMatch.teamA = teamsToAssign.shift()!;
              assignedMatch.teamB = teamsToAssign.shift()!;
            }
          }
        }
      }
    }
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  public static async getById(tournamentId: string, token: string) {
    const tournament = await TournamentRepository.getById(tournamentId);
    if (!tournament) return null;
    const enrichedTournament = await Tournament.enrichWithMSUsers(tournament, token);
    return enrichedTournament;
  }

  public static async countPointsPerTeam(tournamentId: string) {
    const tournament = await TournamentRepository.getById(tournamentId);
    if (!tournament) return null;

    const teams: PointsPerTeam[] = [];
    tournament.teams.forEach((team: TeamWithoutMS) => {
      let points = 0;
      let draws = 0;
      let loses = 0;
      let wins = 0;

      // eslint-disable-next-line no-restricted-syntax
      for (const match of tournament.matches) {
        if (!match.isFinished) continue;
        // eslint-disable-next-line no-nested-ternary
        const teamIdentifierLetter = team.id === match.teamA?.id ? 'a' : (team.id === match.teamB?.id ? 'b' : undefined);
        if (!teamIdentifierLetter) continue;
        const oppositeTeamIdentifierLetter = teamIdentifierLetter === 'a' ? 'b' : 'a';
        if (match.score.final[teamIdentifierLetter] > match.score.final[oppositeTeamIdentifierLetter]) {
          points += 3;
          wins++;
          continue;
        }
        if (match.score.final[teamIdentifierLetter] === match.score.final[oppositeTeamIdentifierLetter]) {
          points++;
          draws++;
          continue;
        }
        if (match.score.final[teamIdentifierLetter] < match.score.final[oppositeTeamIdentifierLetter]) {
          loses++;
          continue;
        }
      }
      teams.push({
        name: team.name, wins, draws, loses, points,
      });
    });
    return teams;
  }

  public static async getAll(page: number, pageSize: number, token: string) {
    const data = await TournamentRepository.getAll(page, pageSize);
    const enrichedTournaments = await Tournament.enrichTournamentsWithMSUsers(data.tournaments, token);

    return {
      totalRows: data.totalRows,
      tournaments: enrichedTournaments,
    };
  }

  public static async delete(tournamentId: string, currentUserId : string) {
    const tournament = await TournamentRepository.getById(tournamentId);
    if (!tournament) throw new AppError('Tournament with such ID does not exist', 404);
    if (currentUserId !== tournament.ownerId) {
      throw new AppError(
        'You are not an owner of given tournament. Only owner of specified tournament can delete it',
        403,
      );
    }

    await TournamentRepository.delete(tournamentId);
  }

  private static generateRoundRobinMatches(teams: Required<TeamWithoutMS>[]): Match[] {
    const { data } = tournamentGenerator([...teams], { type: 'single-round' });

    // generowanie dat
    return data.map((match) => Match.getNewInstance({
      teamA: match.homeTeam,
      teamB: match.awayTeam,
    }));
  }

  private static generateEmptySingleEliminationMatches(matchAmount: number): Match[] {
    const newMatches = [];

    for (let i = 0; i < matchAmount; i++) {
      newMatches.push(Match.getNewInstance());
    }
    // generowanie dat
    return newMatches;
  }

  public static async updateMatchScores(
    data: TournamentApi.UpdateMatchOutcomes,
    tournamentId: string,
    matchId: string,
    currentUserId: string,
  ) {
    if (data.teamA < 0 || data.teamB < 0) throw new AppError('Score can not be negative', 404);

    const tournament = await TournamentRepository.getById(tournamentId);
    if (!tournament) throw new AppError('Tournament does not exits', 404);

    if (tournament.type === 'single-elimination' && data.teamA === data.teamB)
      throw new AppError('Scores can not be the same in single-elimination tournament', 400);

    const rawMatch = tournament.matches.find((match) => String(match.id) === matchId);
    if (!rawMatch) throw new AppError('Match does not exits', 404);

    // TODO: possibility to change score in sigle elimination by owner (it may influence matches tree)
    if (tournament.type === 'single-elimination' && rawMatch.isFinished)
      throw new AppError('The Match has finished', 400);

    const match = new Match(rawMatch);

    const hasOwnerRights = tournament.ownerId === currentUserId;
    const assignedTeam = match.getAssignedTeam(currentUserId);

    if (hasOwnerRights) {
      match.score.final = {
        a: data.teamA,
        b: data.teamB,
      };
      match.isFinished = true;
    } else if (assignedTeam) {
      if (match.isFinished) throw new AppError('Match was finished (owner set score) before', 400);
      if (assignedTeam === 'teamA') {
        if (match.score.reportedByA.a !== -1 || match.isFinished) throw new AppError('The match result has already been reported', 400);
        match.score.reportedByA = {
          a: data.teamA,
          b: data.teamB,
        };
      } else if (assignedTeam === 'teamB') {
        if (match.score.reportedByB.a !== -1 || match.isFinished) throw new AppError('The match result has already been reported', 400);
        match.score.reportedByB = {
          a: data.teamA,
          b: data.teamB,
        };
      }
      if (JSON.stringify(match.score.reportedByA) === JSON.stringify(match.score.reportedByB)) {
        match.score.final = {
          a: match.score.reportedByA.a,
          b: match.score.reportedByA.b,
        };
        match.isFinished = true;
      }
    } else {
      throw new AppError('You are not authorized to update this match', 403);
    }

    if (match.isFinished === true) {
      if (tournament.type === 'single-elimination') {
        const nextMatch = tournament.matches.find((m) => match.id === m.childMatchAId || match.id === m.childMatchBId);

        if (nextMatch) {
          const winner = match.getWinner() as TeamWithoutMS;
          if (nextMatch.childMatchAId === match.id) nextMatch.teamA = winner;
          else nextMatch.teamB = winner;

          await TournamentRepository.updateMatch(nextMatch);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          TournamentRepository.markAsFinished(tournament.id!);
        }
      } else if (tournament.type === 'round-robin') {
        let tournamentIsFinishedFlag = true;
        for (let i = 0; i < tournament.matches.length; i++) {
          if (!tournament.matches[i].isFinished && tournament.matches[i].id !== match.id) {
            tournamentIsFinishedFlag = false;
            break;
          }
        }

        if (tournamentIsFinishedFlag) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await TournamentRepository.markAsFinished(tournament.id!);
        }
      }
    }

    await TournamentRepository.updateMatch(match);
  }

  public static async enrichWithMSUsers(
    tournament: Tournament,
    token: string,
    allUsersPrepared?: User[],
  ): Promise<ITournament> {
    let allUsers: User[] = [];

    if (allUsersPrepared) allUsers = allUsersPrepared;
    else allUsers = await MSOrganization.getAllUsers(token);

    const getUserById = (id: string): User => {
      const user = allUsers.find((u) => u.id === id);

      // TODO: poniższa linijka nie powinna miec prawa bytu ale w przypadku gdy
      // nie przechowujemy userów wszystko może się stać - do przemyślenia
      if (!user) { throw new AppError('Something went wrong', 500); }

      return user;
    };

    const enrichedTeams: ITeam[] = tournament.teams.map((team) => {
      const newTeam = team;

      newTeam.members = team.members.map((member) => ({
        ...member,
        ...getUserById(member.id),
      }));

      return newTeam as ITeam;
    });

    const enrichedMatches: IMatch[] = tournament.matches.map((match) => {
      const newMatch = match;

      if (match.teamA) {
        match.teamA.members = match.teamA.members.map((member) => ({
          ...member,
          ...getUserById(member.id),
        }));
      }
      if (match.teamB) {
        match.teamB.members = match.teamB.members.map((member) => ({
          ...member,
          ...getUserById(member.id),
        }));
      }

      return newMatch as IMatch;
    });

    const enrichedTournament: ITournament = {
      ...tournament,
      owner: getUserById(tournament.ownerId),
      teams: enrichedTeams,
      matches: enrichedMatches,
    };

    return enrichedTournament;
  }

  public static async enrichTournamentsWithMSUsers(
    tournaments: TournamentWithoutMS[],
    token: string,
  ): Promise<ITournament[]> {
    const allUsers = await MSOrganization.getAllUsers(token);
    const enrichedTournaments = [];

    for (let i = 0; i < tournaments.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      enrichedTournaments.push(await Tournament.enrichWithMSUsers(tournaments[i], token, allUsers));
    }

    return enrichedTournaments;
  }

  public static async setSchedulerForTodaysMatchesNotify() {
    const rule = new schedule.RecurrenceRule();
    rule.minute = process.env.SLACK_NOTIFY_TIME_MINUTES || 30;
    rule.hour = process.env.SLACK_NOTIFY_TIME_HOURS || 7;

    schedule.scheduleJob('todaysMatchesNotifi', rule, async () => {
      const activeRawTournaments = await TournamentRepository.getAllActive();
      const token = await MSOrganization.getApplicationToken();
      const activeTournaments = await Tournament.enrichTournamentsWithMSUsers(activeRawTournaments, token);

      activeTournaments.forEach(async (tournament) => {
        const usersEmails: string[] = [];
        const todaysMatches = tournament.matches.filter((match) => match.isFinished === false && isToday(match.date));

        todaysMatches.forEach(async (todaysMatch) => {
          usersEmails.push(...(todaysMatch.teamA?.members.map((member) => member.email) || []));
          usersEmails.push(...(todaysMatch.teamB?.members.map((member) => member.email) || []));
        });

        const userChannels = await Slack.getUsersIds(usersEmails);
        const channelId = await Slack.openConversation(userChannels);
        await Slack.sendMessage(channelId, todaysMatchMessage(tournament, todaysMatches));
      });
    });
  }
}
