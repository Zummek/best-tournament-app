import mongoose, { Schema } from 'mongoose';
import Team from '../../models/team';
import User from '../../models/user';

const UserSchema = new Schema({
  microsoftId: Schema.Types.String,
  alias: {
    type: Schema.Types.String,
    maxLength: 20,
  },
});

const TeamSchema = new Schema({
  name: {
    type: Schema.Types.String,
    minLength: 3,
    maxLength: 40,
  },
  members: [UserSchema],
});

UserSchema.loadClass(User);
TeamSchema.loadClass(Team);

export default mongoose.model('Team', TeamSchema);
