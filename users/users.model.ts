import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    password: {
      select: false,
      type: String
    }
  },
  { versionKey: false }
);

export const User = mongoose.model<IUser>('User', userSchema);
