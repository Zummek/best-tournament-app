/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Team } from '../../../shared/types/Tournament';
import User from '../../../shared/types/User';
import TeamModel from '../models/TeamModel';

export default class TeamRepository {
  public static create = async (name : string, members: User[]) => {
    let team : Team = {
      name: `${name}`,
      members: [],
    };
    team.members = members;
    const document = new TeamModel(team);
    try {
      team = await document.save();
    } catch (err) {
      throw new Error(`${err.name}\n${err.message}`);
    }
    return team;
  };

  // public static createMany = async (teams: Team[]) => {
  //   let savedTeams : Team[];
  //   try {
  //     savedTeams = await TeamModel.insertMany(teams);
  //   } catch (err) {
  //     throw new Error(`${err.name}\n${err.message}`);
  //   }
  //   return savedTeams;
  // };
}
