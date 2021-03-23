import mongoose, { Schema, Document } from 'mongoose';
import { Team } from '../../../shared/types/Tournament';

const UserSchema = new Schema({
  mId: Schema.Types.String,
  alias: {
    type: Schema.Types.String,
    maxLength: 20,
  },
  avatarURL: Schema.Types.String,
});

const TeamSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'No team name was specified'],
    minLength: [3, 'Team name should be at least 3 characters long'],
    maxLength: [40, 'Team name cannot exceed 40 characters'],
  },
  members: [UserSchema],
});

export default mongoose.model<Team & Document>('Team', TeamSchema);
