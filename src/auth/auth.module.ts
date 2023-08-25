import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema';
import { RefreshTokenSchema } from './schema/refresh-token.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JWT_CONFIG } from '../config';
import AuthController from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: JWT_CONFIG.secretKey,
      signOptions: { expiresIn: JWT_CONFIG.expiration },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
