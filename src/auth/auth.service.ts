// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from '../user/interface/user.interface';
// import { Model } from 'mongoose';
// import { RefreshToken } from './interface/refresh-token.interface';
// import { JwtService } from '@nestjs/jwt';
// import Cryptr from 'cryptr';
// import { JwtPayload } from './interface/jwt-payload.interface';
//
// @Injectable()
// export class AuthService {
//   cryptr: any;
//
//   constructor(
//     @InjectModel('User') private readonly userModel: Model<User>,
//     @InjectModel('RefreshToken')
//     private readonly refreshTokenModel: Model<RefreshToken>,
//     private readonly jwtService: JwtService,
//   ) {
//     this.cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
//   }
//
//   async createAccessToken(userId: string) {
//     const accessToken = this.jwtService.sign({ userId });
//   }
//
//   async createRefreshToken(userId: string) {}
//
//   returnJwtExtractor() {}
//
//   async validateUser(payload: JwtPayload) {
//     const user = await this.userModel.findOne({ _id: payload.userId });
//     if (!user) {
//       throw new UnauthorizedException('user not found');
//     }
//
//     return user;
//   }
// }
