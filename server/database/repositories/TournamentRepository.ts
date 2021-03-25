import { Document } from 'mongoose';
import TournamentModel from '../models/TournamentModel';
import Tournament, { Match, Team } from '../../../shared/types/Tournament';
// import TeamModel from '../models/TeamModel';

export default class TournamentRepository {
  public static create =
  async (name: string, ownerMId: string, teams : Team[]) => {
    let tournament : Tournament = {
      name: `${name}`,
      ownerMId: `${ownerMId}`,
      teams: [],
      matches: [],
    };
    tournament.teams = teams;
    const tournamentDoc = new TournamentModel(tournament);
    tournament = await tournamentDoc.save();
    if (tournament.id !== undefined) {
      tournament = await TournamentRepository.getById(tournament.id);
    }
    return tournament;
  };

  public static createMatch = async (tournament: Tournament, teamA: Team, teamB: Team) => {
    if (tournament.id === undefined) throw new Error('Provide tournament does not contain id');
    const tournamentDoc = await TournamentRepository.exist(tournament);
    if (tournamentDoc === null) throw new Error('No such tournament');
    if (teamA.id === undefined || teamB.id === undefined) throw new Error('Provided teams do not contain ids');
    let x = false; let y = false;
    for (let i = 0; i < tournamentDoc.teams.length; i += 1) {
      if (tournament.teams[i].id === teamA.id) { x = true; }
      if (tournament.teams[i].id === teamB.id) { y = true; }
    }
    if (x === false || y === false) throw new Error('Provided teams are not on tournaments team list');

    const match : Match = {
      sideA: {
        team: teamA,
        score: {
          a: -1,
          b: -1,
        },
      },
      sideB: {
        team: teamB,
        score: {
          a: -1,
          b: -1,
        },
      },
      isFinished: false,
    };
    tournamentDoc.matches.push(match);
    tournament = await tournamentDoc.save();
    if (tournament.id !== undefined) {
      tournament = await TournamentRepository.getById(tournament.id);
    }
    return tournament;
  };

  public static updateMatch = async (tournament: Tournament, match: Match) => {
    if (tournament.id === undefined) throw new Error('Provided tournament does not contain id');
    if (match.id === undefined) throw new Error('Provided match does not contain id');
    await TournamentRepository.exist(tournament);
    let isMatch = false;
    for (let i = 0; i < tournament.matches.length; i += 1) {
      if (tournament.matches[i].id === match.id) {
        isMatch = true;
        if (tournament.matches[i].sideA.team.id === match.sideA.team.id
            && tournament.matches[i].sideB.team.id === match.sideB.team.id) {
          tournament.matches[i] = match;
        } else {
          throw new Error('Teams ids in provided Match don\'t match Teams ids in correspoding Tournament Match');
        }
      }
    }
    if (isMatch === false) throw new Error('No such match in provided tournament');
    const tournamentDoc = new TournamentModel(tournament);
    tournament = await tournamentDoc.save();
    if (tournament.id !== undefined) {
      tournament = await TournamentRepository.getById(tournament.id);
    }
    return tournament;
  };

  public static getAll = async () => {
    const tournaments : Tournament[] = await TournamentModel.find()
      .populate('teams')
      .populate('matches.sideA.team')
      .populate('matches.sideB.team')
      .exec();
    return tournaments;
  };

  public static getById = async (idSearch: string) => {
    const tournament : Tournament | null = await TournamentModel.findById(idSearch)
      .populate('teams')
      .populate('matches.sideA.team')
      .populate('matches.sideB.team')
      .exec();
    if (tournament === null) { throw new Error('No such tournament in DB'); } else { return tournament; }
  };

  private static exist = async (tournament: Tournament | string) => {
    let tournamentDoc : (Document & Tournament) | null;
    // Does tournament exist?
    if (typeof tournament === 'string') {
      tournamentDoc = await TournamentModel.findById(tournament).exec();
    } else { // typeof tournament : Tournament
      tournamentDoc = await TournamentModel.findById(tournament.id).exec();
    }
    if (tournamentDoc === null) { throw new Error('Tournament has not been found'); }
    return tournamentDoc;
  };
}
