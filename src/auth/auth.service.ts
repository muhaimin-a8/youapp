import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/interface/user.interface';
import { Model } from 'mongoose';
import { RefreshToken } from './interface/refresh-token.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { AuthenticationError } from '../common/exceptions/authentication.error';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('RefreshToken')
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly userSevice: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithUsernameOREmail(loginDto: LoginUserDto) {
    const user =
      loginDto.username !== undefined
        ? await this.userSevice.getUserByUsername(loginDto.username)
        : await this.userSevice.getUserByEmail(loginDto.email);

    const match = await bcrypt.compare(loginDto.password, user.password);
    if (!match) {
      throw new AuthenticationError('invalid credentials');
    }
    const refreshToken = new this.refreshTokenModel(
      await this.createRefreshToken(user._id.toString()),
    );

    // save refresh token to database
    await refreshToken.save();

    return {
      accessToken: await this.createAccessToken(user._id.toString()),
      refreshToken: refreshToken.refreshToken,
    };
  }

  private async createAccessToken(userId: string) {
    return this.jwtService.sign({ userId });
  }

  private async createRefreshToken(userId: string) {
    const refreshToken = new this.refreshTokenModel({
      refreshToken: this.jwtService.sign({ userId }, {}),
    });

    await refreshToken.save();
    return refreshToken.refreshToken;
  }

  async validateJwtCredential(jwtPayload: JwtPayload) {
    const user = this.userModel.findOne({ _id: jwtPayload.userId });
    if (!user) {
      throw new AuthenticationError('invalid credentials');
    }
    return user;
  }
}
