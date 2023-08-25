import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
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
      return res
        .status(HttpStatus.CREATED)
        .json(this.sendResponseMessage('success to register new user'));
    } catch (e) {
      return this.sendErrorMessage(res, e);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async loginUserByUsernameOrEmail(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.loginByUsernameOrEmail(loginUserDto);
  }

  private sendResponseMessage(message: string) {
    return {
      status: 'success',
      message: message,
    };
  }

  private sendErrorMessage(res: Response, e: Error) {
    if (e instanceof ClientError) {
      return res.status(e.code).json({
        status: 'failed',
        message: e.message,
      });
    }

    console.error(e);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}
