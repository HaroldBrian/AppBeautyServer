/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma, Town } from '@prisma/client';
import { TownsService } from './towns.service';

@ApiTags("Town management")
@Controller('api/v1/towns')
export class TownsController {
  constructor(private readonly townsService: TownsService) {}

  @Get()
  async getAllTowns(): Promise<Town[]> {
    return this.townsService.getAllTowns();
  }

  @Get(':id')
  async getTownById(@Param('id') id: string): Promise<Town | null> {
    return this.townsService.getTownById(Number(id));
  }

  @Get('country/:countryId')
  async getTownsByCountry(@Param('countryId') countryId: string): Promise<Town[]> {
    return this.townsService.getTownsByCountry(Number(countryId));
  }

  @Post()
  async createTown(@Body() town: Prisma.TownCreateInput): Promise<Town> {
    return this.townsService.createTown(town);
  }

  @Put(':id')
  async updateTown(
    @Param('id') id: string,
    @Body() townData: Prisma.TownUpdateInput,
  ): Promise<Town> {
    return this.townsService.updateTown(Number(id), townData);
  }

  @Delete(':id')
  async deleteTown(@Param('id') id: string): Promise<Town> {
    return this.townsService.deleteTown(Number(id));
  }
}
