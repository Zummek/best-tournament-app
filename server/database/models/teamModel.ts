import mongoose, { Schema, Document } from 'mongoose';
import { Team } from '../../../shared/types/Tournament';

const UserSchema = new Schema({
  microsoftId: String,
  alias: String,
});

const TeamSchema = new Schema({
  name: String,
  members: [UserSchema],
});

interface TeamDocument extends Team, Document{}
const TeamModel = mongoose.model<TeamDocument>('Team', TeamSchema);

export default TeamModel;
