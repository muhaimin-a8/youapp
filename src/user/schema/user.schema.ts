import { Schema } from 'mongoose';
import validator from 'validator';

export const UserSchema = new Schema({
  username: {
    type: String,
    minLength: 5,
    maxLength: 255,
    required: [true, 'NAME IS REQUIRED'],
  },
  email: {
    type: String,
    lowercase: true,
    validate: validator.isEmail,
    minLength: 5,
    maxLength: 255,
    required: [true, 'EMAIL IS REQUIRED'],
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 1024,
    required: [true, 'PASSWORD IS REQUIRED'],
  },
});
