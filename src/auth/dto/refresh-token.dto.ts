import { IsBase64, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsBase64()
  @IsNotEmpty()
  refresh_token: string;
}
