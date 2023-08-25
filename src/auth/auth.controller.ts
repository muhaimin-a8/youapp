import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { WebResponse } from '../common/response/web.response';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User Auth')
@Controller('api/users/auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}
  //LOGIN USER
  @Post()
  @ApiOperation({ description: 'login user' })
  async loginUser(@Res() res: Response, @Body() loginDto: LoginUserDto) {
    try {
      const data = await this.authService.loginWithUsernameOREmail(loginDto);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return WebResponse.sendResponseMessage({
        res: res,
        code: HttpStatus.OK,
        data: data,
      });
    } catch (e) {
      return WebResponse.sendErrorMessage(res, e);
    }
  }
}
