/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Town } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TownsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTowns(): Promise<Town[]> {
    return this.prisma.town.findMany();
  }

  async getTownById(id: number): Promise<Town | null> {
    return this.prisma.town.findUnique({
      where: { id },
    });
  }

  async getTownsByCountry(countryId: number): Promise<Town[]> {
    return this.prisma.town.findMany({
      where: { countryId },
    });
  }

  async createTown(data: Prisma.TownCreateInput): Promise<Town> {
    return this.prisma.town.create({
      data,
    });
  }

  async updateTown(id: number, data: Prisma.TownUpdateInput): Promise<Town> {
    return this.prisma.town.update({
      where: { id },
      data,
    });
  }

  async deleteTown(id: number): Promise<Town> {
    const data = await this.prisma.town.findUnique({
      where: { id },
    });

    if (!data) throw new HttpException("There's no town with id " + id, HttpStatus.NOT_FOUND);

    return this.prisma.town.delete({
      where: { id },
    });
  }
}
