/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TownDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly label: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly countryId: number;
}
