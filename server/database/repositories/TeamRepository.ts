import { Team } from '../../../shared/types/Tournament';
import TeamModel from '../models/TeamModel';

export default class TeamRepository {
  public static create = async (team: Team) => TeamModel.create(team);

  // Mongoose always validates each document before sending insertMany to MongoDB.
  // So if one document has a validation error, no documents will be saved,
  // Returns: documents(teams) that passed validation
  public static createMany = async (teams: Team[]) => TeamModel.insertMany(teams);
}
