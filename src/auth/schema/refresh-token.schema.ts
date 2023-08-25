import { Schema } from 'mongoose';

export const RefreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});
