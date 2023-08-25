import { Response } from 'express';
import { ClientError } from '../exceptions/client.error';
import { HttpStatus } from '@nestjs/common';

export class WebResponse {
  static sendResponseMessage({ res, code, message, data }) {
    res.status(code);
    return res.json({ code, message, data });
  }

  static sendErrorMessage(res: Response, e: Error) {
    if (e instanceof ClientError) {
      res.status(e.code);
      res.json({
        statusCode: e.code,
        error: e.error,
        message: e.message,
      });
      return res;
    }

    console.error(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Internal Server Error',
    });
    return res;
  }
}
