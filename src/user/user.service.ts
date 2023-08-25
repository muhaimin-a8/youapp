import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { RegisterUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InvariantError } from '../common/exceptions/invariant.error';
import { AuthenticationError } from '../common/exceptions/authentication.error';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(userDto: RegisterUserDto) {
    const user = new this.userModel(userDto);

    await this.isUsernameNotExist(user.username);
    await this.isEmailNotExist(user.email);

    user.password = await bcrypt.hash(user.password, 12);
    await user.save();
  }

  async isUsernameNotExist(username: string) {
    if (await this.userModel.findOne({ username: username })) {
      throw new InvariantError('username already exists');
    }
  }

  async isEmailNotExist(email: string) {
    if (await this.userModel.findOne({ email: email })) {
      throw new InvariantError('email already exists');
    }
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username });

    if (!user) {
      throw new AuthenticationError('invalid credentials');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new AuthenticationError('invalid credentials');
    }
    return user;
  }
}
