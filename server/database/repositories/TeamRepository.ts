import { TeamWithoutMS } from '../../../shared/types/Tournament';
import { UserWithoutMS } from '../../../shared/types/User';
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
export function toTeam(teamDb: TeamDocument): Required<TeamWithoutMS> {
  return {
    id: teamDb._id.toString(),
    name: teamDb.name,
    members: teamDb.members.map((userDoc) => toUser(userDoc)),
  };
}
type CreateTeam = Omit<TeamWithoutMS, 'id'>;

export default class TeamRepository {
  public static create = async (team: CreateTeam) => {
    const teamDb = toTeamDb(team);
    return toTeam(await TeamModel.create(teamDb));
  };

  // Mongoose always validates each document before sending insertMany to MongoDB.
  // So if one document has a validation error, no documents will be saved,
  // Returns: documents(teams) that passed validation

  public static createMany = async (teams: CreateTeam[]) => {
    const teamsDb = teams.map((team) => toTeamDb(team));
    const teamDocs = await TeamModel.insertMany(teamsDb);
    const createdTeams = teamDocs.map((team) => toTeam(team));
    return createdTeams;
  };
}
