import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema';
import { RefreshTokenSchema } from './schema/refresh-token.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../config';
import { UserModule } from '../user/user.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
