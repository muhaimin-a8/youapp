import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InvariantError } from '../common/exceptions/invariant.error';
import { AuthenticationError } from '../common/exceptions/authentication.error';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, // private readonly authService: AuthService,
  ) {}

  async createUser(userDto: RegisterUserDto) {
    const user = new this.userModel(userDto);

    await this.isUsernameNotExist(user.username);
    await this.isEmailNotExist(user.email);

    user.password = await bcrypt.hash(user.password, 12);
    await user.save();
  }

  async loginByUsernameOrEmail(loginDto: LoginUserDto) {
    const user = await this.findUserByUsernameOREmail(loginDto.usernameOrEmail);
    await this.checkPassword(loginDto.password, user.password);

    return {
      accessToken: 'testaccessToken', //await this.authService.createAccessToken(user.username),
      refreshToken: 'test', //await this.authService.createRefreshToken(user.username),
    };
  }

  private async isUsernameNotExist(username: string) {
    if (await this.userModel.findOne({ username: username })) {
      throw new InvariantError('username already exists');
    }
  }

  private async isEmailNotExist(email: string) {
    if (await this.userModel.findOne({ email: email })) {
      throw new InvariantError('email already exists');
    }
  }

  private async findUserByUsernameOREmail(userOrEmail: string) {
    const user =
      (await this.userModel.findOne({ email: userOrEmail })) ||
      (await this.userModel.findOne({ username: userOrEmail }));

    if (!user) {
      throw new AuthenticationError('invalid credentials');
    }
    return user;
  }
}
