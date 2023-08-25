import { ClientError } from './client.error';

export class InvariantError extends ClientError {
  constructor(message) {
    super(message);
  }
}
