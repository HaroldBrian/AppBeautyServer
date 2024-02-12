/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductCategoryDto {
    @IsNotEmpty()
    @IsString()
    label: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  }

export class UpdateProductCategoryDto extends PartialType(CreateProductCategoryDto) {}
