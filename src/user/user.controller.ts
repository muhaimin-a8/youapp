import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ClientError } from '../common/exceptions/client.error';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({})
  @ApiCreatedResponse({})
  async registerUser(
    @Res() res: Response,
    @Body() createUserDto: RegisterUserDto,
  ) {
    try {
      await this.userService.createUser(createUserDto);
      return this.sendResponseMessage(res, 201, 'success to register new user');
    } catch (e) {
      return this.sendErrorMessage(res, e);
    }
  }

  private sendResponseMessage(
    res: Response,
    code: number,
    message: string,
    data?: any,
  ) {
    res.status(code);
    res.json({
      statusCode: code,
      message: message,
      data: data,
    });
    return res;
  }

  private sendErrorMessage(res: Response, e: Error) {
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
