import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONFIG } from '../../config';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG.secretKey,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateJwtCredential(payload);
    return {
      id: user._id.toString(),
      username: user.username,
    };
  }
}
