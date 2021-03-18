/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Team } from '../../../shared/types/Tournament';
import TeamModel from '../models/TeamModel';

export default class TeamRepository {
  public static insert = async (team : Team) => {
    const document = new TeamModel(team);
    let savedTeam : Team;
    try {
      savedTeam = await document.save();
    } catch (err) {
      throw new Error(`${err.name}\n${err.message}`);
    }
    return savedTeam;
  };

  public static insertMany = async (teams: Team[]) => {
    let savedTeams : Team[];
    try {
      savedTeams = await TeamModel.insertMany(teams);
    } catch (err) {
      throw new Error(`${err.name}\n${err.message}`);
    }
    return savedTeams;
  };
}
