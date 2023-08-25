import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { WebResponse } from '../common/response/web.response';
import { RegisterUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // USER REGISTRATION
  @Post()
  @ApiOperation({})
  @ApiCreatedResponse({})
  async registerUser(
    @Res() res: Response,
    @Body() createUserDto: RegisterUserDto,
  ) {
    try {
      await this.userService.createUser(createUserDto);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return WebResponse.sendResponseMessage({
        res: res,
        code: HttpStatus.CREATED,
        message: 'success to create new user',
      });
    } catch (e) {
      return WebResponse.sendErrorMessage(res, e);
    }
  }
}
