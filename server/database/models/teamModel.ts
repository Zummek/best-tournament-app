import mongoose, { Schema, Model, Types } from 'mongoose';
import { Team } from '../../../shared/types/Tournament';
import User from '../../../shared/types/User';

const UserSchema = new Schema({
  microsoftId: Schema.Types.String,
  alias: Schema.Types.String,
});

const TeamSchema = new Schema <TeamDocument, TeamModel>({
  name: Schema.Types.String,
  members: [UserSchema],
});

export interface TeamDocument extends Team, mongoose.Document {
  members: Types.Array<User>;
}
export type TeamModel = Model<TeamDocument>;

export default mongoose.model <TeamDocument, TeamModel>('Team', TeamSchema);
