import mongoose, { Schema } from 'mongoose';
import { Team } from '../../../shared/types/Tournament';

const UserSchema = new Schema({
  microsoftId: Schema.Types.String,
  alias: Schema.Types.String,
});

const TeamSchema = new Schema({
  name: Schema.Types.String,
  members: [UserSchema],
});

interface TeamDocument extends Team, mongoose.Document {}

export default mongoose.model <TeamDocument>('Team', TeamSchema);
