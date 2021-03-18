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
    let tournamentDoc : (Document & Tournament) | null;
    // Does tournament exist?
    if (typeof tournament === 'string') {
      tournamentDoc = await TournamentModel.findById(tournament).exec();
    } else { // typeof tournament : Tournament
      tournamentDoc = await TournamentModel.findById(tournament.id).exec();
    }
    if (tournamentDoc === null) { throw new Error('Tournament has not been found'); }
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
}
