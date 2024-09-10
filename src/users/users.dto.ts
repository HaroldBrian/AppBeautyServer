/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class SignupDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsOptional()
  @ApiProperty()
  telephone: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  new_password: string;

  @IsNotEmpty()
  @ApiProperty()
  old_password: string;
}


export class UpdateProfileDto {
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  surname: string;

  @IsOptional()
  @ApiProperty()
  telephone: string;

  @IsOptional()
  @ApiProperty()
  address: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ApiProperty()
  logo: string;
}