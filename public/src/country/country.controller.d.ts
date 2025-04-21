import { Country, Prisma } from '@prisma/client';
import { CountryService } from './country.service';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    getAllCountries(): Promise<Country[]>;
    getCountryById(id: string): Promise<Country | null>;
    createCountry(country: Prisma.CountryCreateInput): Promise<Country>;
    updateCountry(id: string, country: Prisma.CountryUpdateInput): Promise<Country>;
    deleteCountry(id: string): Promise<Country>;
}
