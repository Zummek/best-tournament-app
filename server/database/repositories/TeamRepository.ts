import { TeamWithoutMS } from '../../../shared/types/Tournament';
import { UserWithoutMS } from '../../../shared/types/User';
import AppError from '../../utils/appError';
import TeamModel, { TeamDocument, UserDocument } from '../models/TeamModel';

interface UserDb extends Omit<UserWithoutMS, 'id'> {
  _id: string,
}
function toUserDb(usr: UserWithoutMS): UserDb {
  return { _id: usr.id, ...usr };
}
function toUser(usrDb: UserDocument): UserWithoutMS {
  // const usr : UserWithoutMS = {id: usrDb._id, ...usrDb}; <- tak nie mozna bo zworcimy wszystkie rzeczy z mongo
  return {
    id: usrDb._id.toString(),
    // .. more user fields
  };
}

export interface TeamDb extends Omit<TeamWithoutMS, 'id' | 'members'> {
  _id?: string
  members: UserDb[];
}
export function toTeamDb(team: TeamWithoutMS): TeamDb {
  const teamDb: TeamDb = {
    _id: team.id,
    name: team.name,
    members: team.members.map((user) => toUserDb(user)),
  };
  return teamDb;
}
export function toTeam(teamDb: TeamDocument): TeamWithoutMS {
  const team: TeamWithoutMS = {
    id: teamDb._id.toString(),
    name: teamDb.name,
    members: teamDb.members.map((userDoc) => toUser(userDoc)),
  };
  return team;
}

export default class TeamRepository {
  public static create = async (team: TeamWithoutMS) => {
    const teamDb = toTeamDb(team);
    if (teamDb._id !== undefined) { throw new AppError('New team should not contain id', 400); }
    const teamWithoutMS = toTeam(await TeamModel.create(teamDb));
    return teamWithoutMS;
  };

  // Mongoose always validates each document before sending insertMany to MongoDB.
  // So if one document has a validation error, no documents will be saved,
  // Returns: documents(teams) that passed validation
  public static createMany = async (teams: TeamWithoutMS[]) => {
    const teamsDb = teams.map((team) => toTeamDb(team));

    teamsDb.forEach(async (team) => {
      if (team._id !== undefined) throw new AppError('New team should not contain id', 400);
    });
    const teamDocs = await TeamModel.insertMany(teamsDb);
    teams = teamDocs.map((team) => toTeam(team));
    return teams;
  };
}
