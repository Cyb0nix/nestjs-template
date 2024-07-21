import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/repository/entity/user.entity';
import { JwtUser } from './interfaces/jwt-user.interface';
import { ErrorEnum, ErrorMessageEnum } from '../shared/error.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  @InjectRepository(UserEntity)
  userRepository: Repository<UserEntity>;

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(
        configService.get<string>('JWT_SECRET_KEY_BASE64'),
        'base64',
      ),
    });
  }

  async validate(payload: JwtUser): Promise<JwtUser> {
    const user = await this.userRepository.findOne({
      where: {
        id: payload.userId,
      }
    });

    if (!user || payload.userId !== user.id) {
      throw new UnauthorizedException({
        code: ErrorEnum.invalid_token,
        message: ErrorMessageEnum.invalid_token,
      });
    }

    return {
      userId: user.id,
      role: user.role
    };
  }
}
