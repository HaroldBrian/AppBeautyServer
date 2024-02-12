/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Country, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCountries(): Promise<Country[]> {
    return this.prisma.country.findMany();
  }

  async getCountryById(id: number): Promise<Country | null> {
    return this.prisma.country.findUnique({
      where: { id }
    });
  }

  async createCountry(data: Prisma.CountryCreateInput): Promise<Country> {
    return this.prisma.country.create({
      data
    });
  }

  async updateCountry(id: number, data: Prisma.CountryUpdateInput): Promise<Country> {
    return this.prisma.country.update({
      where: { id },
      data
    });
  }

  async deleteCountry(id: number): Promise<Country> {
    const data = await this.prisma.country.findUnique({
      where: { id },
    });

    if (!data) throw new HttpException("There's no category with id " + id, HttpStatus.NOT_FOUND);

    return this.prisma.country.delete({
      where: { id }
    });
  }
}
