/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Country, Prisma } from '@prisma/client';
import { CountryService } from './country.service';

@ApiTags('Country Management')
@Controller('api/v1/countries')
export class CountryController {
    constructor(private readonly countryService: CountryService){}

    @Get()
    async getAllCountries(): Promise<Country[]>{
        return this.countryService.getAllCountries();
    }

    @Get(':id')
    async getCountryById(@Param('id') id: string): Promise<Country | null>{
        return this.countryService.getCountryById(Number(id));
    }

    @Post()
    async createCountry(@Body() country: Prisma.CountryCreateInput): Promise<Country>{
        return this.countryService.createCountry(country);
    }

    @Put(':id')
    async updateCountry(@Param('id') id: string, @Body() country: Prisma.CountryUpdateInput): Promise<Country>{
        return this.countryService.updateCountry(Number(id), country);
    }

    @Delete('id')
    async deleteCountry(@Param('id') id: string): Promise<Country>{
        return this.countryService.deleteCountry(Number(id));
    }
}
