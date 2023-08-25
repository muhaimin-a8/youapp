export class ClientError extends Error {
  code: number;
  message: string;
  error: string;
  constructor(message: string, code = 400, error = 'Bad Request') {
    super(message);
    this.code = code;
    this.message = message;
    this.error = error;
  }
}
