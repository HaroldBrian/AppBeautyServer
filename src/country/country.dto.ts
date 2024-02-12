/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CountryDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly label: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly code: string;

  readonly description?: string;
}
