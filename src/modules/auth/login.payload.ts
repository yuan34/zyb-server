import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginPayload {
  @MaxLength(16)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
