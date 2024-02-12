/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  time: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  discount: number;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  @IsOptional()
  @IsArray()
  image: any[];

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  categoryId: number;
}