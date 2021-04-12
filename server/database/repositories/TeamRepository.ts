import { TeamWithoutMS } from '../../../shared/types/Tournament';
import AppError from '../../utils/appError';
import TeamModel from '../models/TeamModel';

export default class TeamRepository {
  public static create = async (team: TeamWithoutMS) => {
    if (team._id !== undefined) throw new AppError('New team should not contain id', 400);
    const teamWithoutMS : TeamWithoutMS = await TeamModel.create(team);
    return teamWithoutMS;
  };

  // Mongoose always validates each document before sending insertMany to MongoDB.
  // So if one document has a validation error, no documents will be saved,
  // Returns: documents(teams) that passed validation
  public static createMany = async (teams: TeamWithoutMS[]) => {
    teams.forEach(async (team) => {
      if (team._id !== undefined) throw new AppError('New team should not contain id', 400);
    });
    const teamsWithoutMS : TeamWithoutMS[] = await TeamModel.insertMany(teams);
    return teamsWithoutMS;
  };
}
