import { Document } from 'mongoose';
import TournamentModel from '../models/TournamentModel';
import Tournament, { Team } from '../../../shared/types/Tournament';
import TeamModel from '../models/TeamModel';

export default class TournamentRepository {
  public static insert = async (tournament: Tournament) => {
    const document = new TournamentModel(tournament);
    let savedTournament : Tournament;
    try {
      savedTournament = await document.save();
    } catch (err) {
      throw new Error(err);
    }
    return savedTournament;
  };

  public static insertTeam = async (tournament: Tournament | string, team : Team | string) => {
    // Does tournament exist?
    let tournamentDoc : (Document & Tournament) | null;
    // eslint-disable-next-line prefer-const
    tournamentDoc = await TournamentRepository.exist(tournament);
    // Does team exist?
    let teamDoc: (Document & Team) | null;
    if (typeof team === 'string') {
      teamDoc = await TeamModel.findById(team).exec();
    } else { // typeof team : Team
      teamDoc = await TeamModel.findById(team.id).exec();
    }
    if (teamDoc === null) { throw new Error('Team has not been found'); }
    // Try to save
    tournamentDoc.teams.push(teamDoc.id);
    let savedTournament : Tournament;
    try {
      savedTournament = await tournamentDoc.save();
    } catch (err) {
      throw new Error(err);
    }
    return savedTournament;
  };

  public static getAll = async () => {
    const tournaments : Tournament[] = await TournamentModel.find()
      .populate('teams')
      .populate('matches.sideA.team')
      .populate('matches.sideB.team')
      .exec();
    return tournaments;
  };

  public static getByName = async (nameSearch: string) => {
    const tournament : Tournament | null = await TournamentModel.findOne({ name: `${nameSearch}` }).exec();
    if (tournament === null) { throw new Error('No such tournament in DB'); } else { return tournament; }
  };

  public static insertManyTeams =
  async (tournament: Tournament | string, teams : Array<Team | string>) => {
    const promises : Promise<Tournament>[] = [];
    for (let i = 0; i < teams.length; i += 1) {
      promises.push(TournamentRepository.insertTeam(tournament, teams[i]));
    }
    await Promise.all(promises);
    return promises;
  };

  // public static insertMatch =
  // async (tournament: Tournament | string, match : Match | string) => {
  //   let tournamentDoc : (Document & Tournament) | null;
  //   // eslint-disable-next-line prefer-const
  //   tournamentDoc = await TournamentRepository.exist(tournament);
  //   if()
  // };

  private static exist = async (tournament: Tournament | string) => {
    let tournamentDoc : (Document & Tournament) | null;
    // Does tournament exist?
    if (typeof tournament === 'string') {
      tournamentDoc = await TournamentModel.findOne({ name: `${tournament}` }).exec();
    } else { // typeof tournament : Tournament
      tournamentDoc = await TournamentModel.findOne({ name: `${tournament.name}` }).exec();
    }
    if (tournamentDoc === null) { throw new Error('Tournament has not been found'); }
    return tournamentDoc;
  };
}
