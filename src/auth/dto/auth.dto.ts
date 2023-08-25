import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginUserDto {
  @ApiPropertyOptional({
    description: 'your username',
    minLength: 5,
    maxLength: 255,
  })
  @ValidateIf((o) => o.email === undefined)
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsNotEmpty()
  readonly username: string;

  @ApiPropertyOptional({
    description: 'or your email',
    minLength: 5,
    maxLength: 255,
  })
  @ValidateIf((o) => o.username === undefined)
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'your pasword',
    minLength: 8,
    maxLength: 1024,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(1024)
  password: string;
}
