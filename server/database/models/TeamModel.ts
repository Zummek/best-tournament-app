import mongoose, { Schema, Document } from 'mongoose';
import { TeamWithoutMS } from '../../../shared/types/Tournament';
import { UserWithoutMS } from '../../../shared/types/User';

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.String,
    required: [true, 'User should have id (from organization)'],
  },
  alias: {
    type: Schema.Types.String,
    maxLength: 20,
  },
});

const TeamSchema = new Schema({
  // _id added automatically
  name: {
    type: Schema.Types.String,
    required: [true, 'No team name was specified'],
    minLength: [3, 'Team name should be at least 3 characters long'],
    maxLength: [40, 'Team name cannot exceed 40 characters'],
  },
  members: {
    type: [UserSchema],
    required: true,
  },
});
export interface UserDocument extends Omit<UserWithoutMS, 'id'>, Document {
}

export interface TeamDocument extends Omit<TeamWithoutMS, 'id' | 'members'>, Document {
  members: UserDocument[];
}
export default mongoose.model<TeamDocument>('Team', TeamSchema);
