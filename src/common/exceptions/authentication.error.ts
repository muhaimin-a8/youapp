import { ClientError } from './client.error';

export class AuthenticationError extends ClientError {
  constructor(message: string) {
    super(message, 401);
  }
}
