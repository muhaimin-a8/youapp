export class ClientError extends Error {
  code: number;
  message: string;
  constructor(message: string, code = 400) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
