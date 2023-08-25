import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly profileImage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly birthday: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly weight: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly height: number;
}

export class UpdateProfileDto {
  userId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly profileImage: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly displayName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly gender: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly birthday: Date;

  @ApiPropertyOptional()
  @IsOptional()
  readonly weight: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly heigth: number;
}
