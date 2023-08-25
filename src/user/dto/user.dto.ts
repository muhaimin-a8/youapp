import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(1024)
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(1024)
  password: string;
}
