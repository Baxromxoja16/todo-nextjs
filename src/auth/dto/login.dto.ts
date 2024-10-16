import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
