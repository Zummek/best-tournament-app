/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Team } from '../../../shared/types/Tournament';
import User from '../../../shared/types/User';
import TeamModel from '../models/TeamModel';

export default class TeamRepository {
  public static create = async (name : string, members: User[]) => {
    const team : Team = await TeamModel.create({
      name: `${name}`,
      members: [],
    });
    return team;
  };

  // Mongoose always validates each document before sending insertMany to MongoDB.
  // So if one document has a validation error, no documents will be saved,
  // Returns: documents(teams) that passed validation
  public static createMany = async (teams: Team[]) => {
    const savedTeams : Team[] = await TeamModel.insertMany(teams);
    return savedTeams;
  };
}
