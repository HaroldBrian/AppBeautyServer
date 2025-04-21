import { Country, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CountryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllCountries(): Promise<Country[]>;
    getCountryById(id: number): Promise<Country | null>;
    createCountry(data: Prisma.CountryCreateInput): Promise<Country>;
    updateCountry(id: number, data: Prisma.CountryUpdateInput): Promise<Country>;
    deleteCountry(id: number): Promise<Country>;
}
