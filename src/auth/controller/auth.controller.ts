import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.login(signInDto.email, signInDto.password);
  }


  @Delete('logout')
  async logout(@Body() refresh: RefreshTokenDto) {
    return await this.authService.logout(refresh.refresh_token);
  }

  @Post('refresh')
  async refresh(@Body() refresh: RefreshTokenDto) {
    return await this.authService.refresh(refresh.refresh_token);
  }

}
