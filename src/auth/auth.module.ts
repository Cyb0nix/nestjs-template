import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { RefreshTokenEntity } from './entity/refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfig } from './auth.config';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from '../user/repository/entity/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      RefreshTokenEntity,
      UserEntity
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule, ConfigModule.forFeature(AuthConfig)],
      useFactory: async (configService: ConfigService) => ({
        secret: Buffer.from(configService.get<string>('auth.secret'), 'base64'),
        signOptions: { expiresIn: '10m' },
      }),
      inject: [ConfigService],
    })
  ],
  providers: [AuthService, JwtStrategy, ConfigService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
