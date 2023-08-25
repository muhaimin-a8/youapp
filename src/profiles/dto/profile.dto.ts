import { IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  readonly profileImage: string;

  @IsString()
  @IsOptional()
  readonly displayName: string;

  @IsString()
  @IsOptional()
  readonly gender: string;

  @IsString()
  @IsOptional()
  readonly birthday: string;

  @IsString()
  @IsOptional()
  readonly weight: number;

  @IsString()
  @IsOptional()
  readonly heigth: number;
}

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  readonly profileImage: string;

  @IsString()
  @IsOptional()
  readonly displayName: string;

  @IsString()
  @IsOptional()
  readonly gender: string;

  @IsString()
  @IsOptional()
  readonly birthday: string;

  @IsString()
  @IsOptional()
  readonly weight: number;

  @IsString()
  @IsOptional()
  readonly heigth: number;
}
