import TournamentModel from '../models/TournamentModel';
import Tournament, { Match } from '../../../shared/types/Tournament';
// import TeamModel from '../models/TeamModel';

export default class TournamentRepository {
  public static create =
  async (t: Tournament) => {
    // Check if teams have ids, if teams in matches have ids
    // and if teams in matches are on teams list
    t.teams.forEach((team) => {
      if (team.id === undefined) { throw new Error('All teams should have ids.'); }
    });
    t.matches.forEach((match) => {
      if (match.sideA.team.id === undefined || match.sideB.team.id === undefined) { throw new Error('All teams in matches entries should have ids'); }
      let isTeamAOnTeamsList = false;
      let isTeamBOnTeamsList = false;
      t.teams.forEach((team) => {
        if (team.id === match.sideA.team.id) { isTeamAOnTeamsList = true; }
        if (team.id === match.sideB.team.id) { isTeamBOnTeamsList = true; }
      });
      if (isTeamAOnTeamsList || isTeamBOnTeamsList) { throw new Error('All teams in matches entries should reffer to teams from tournaments teams list'); }
    });
    const savedT : Tournament = await TournamentModel.create(t);
    return savedT;
  };

  public static updateMatch = async (match: Match) => {
    if (match.id === undefined) throw new Error('Provided match does not contain id');
    // $set is a filter that tells mongo to update only match with specified id
    let t: Tournament | null = await TournamentModel.findOneAndUpdate(
      { 'matches.id': match.id },
      {
        $set: {
          'matches.$': match,
        },
      },
      { new: true },
    ).exec();
    // finding document with getById in order to return populated document
    if (t !== null) {
      if (t.id !== undefined) {
        t = await TournamentRepository.getById(t.id); // returns populated tournament
      }
    }
    return t;
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
    return tournament;
  };
}
