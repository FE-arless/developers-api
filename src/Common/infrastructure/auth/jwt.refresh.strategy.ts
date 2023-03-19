import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/Sign/domain/service/auth.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/Users/domain/service/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('secret'),
    });
  }

  async validate(payload: any) {
    return this.userService.getUserInfo(payload.email);
  }
}