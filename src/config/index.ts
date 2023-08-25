import * as process from 'process';
import 'dotenv/config';

export const JWT_CONFIG = {
  secretKey: process.env.JWT_SECRET,
  expiration: process.env.JWT_EXPIRATION || 60,
};

export const MONGO_CONFIG = {
  uri: process.env.MONGO_URI,
};

export const SERVER_CONFIG = {
  port: process.env.PORT || 3000,
};
