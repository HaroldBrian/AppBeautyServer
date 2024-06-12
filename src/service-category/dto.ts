/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateServiceCategoryDto {
    // @IsNotEmpty()
    // @IsString()
    @IsOptional()
    label: string;
  
    @IsOptional()
    // @IsString()
    description?: string;
  }

export class UpdateServiceCategoryDto extends PartialType(CreateServiceCategoryDto) {}
