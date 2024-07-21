import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../../shared/api-enums';


export class CreateUserDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  type: UserRole;
}