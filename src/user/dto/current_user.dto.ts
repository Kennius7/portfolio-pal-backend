import { IsString } from 'class-validator';

export class CurrentUserDto {
  @IsString()
  userId: string;

  @IsString()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
