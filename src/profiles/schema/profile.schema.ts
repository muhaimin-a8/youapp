import { Schema } from 'mongoose';

export const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  profileImage: {
    type: String,
  },
  displayName: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  heroscope: {
    type: String,
  },
  zodiac: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
});
