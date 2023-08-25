import { User } from '../../user/interface/user.interface';

export interface RefreshToken extends Document {
  userId: User;
  refreshToken: string;
}
