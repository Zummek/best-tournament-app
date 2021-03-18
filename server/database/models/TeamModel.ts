import mongoose, { Schema, Document } from 'mongoose';
import { Team } from '../../../shared/types/Tournament';

const UserSchema = new Schema({
  mId: Schema.Types.String,
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

export default mongoose.model<Team & Document>('Team', TeamSchema);
