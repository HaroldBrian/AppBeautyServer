import { Prisma, Town } from '@prisma/client';
import { TownsService } from './towns.service';
export declare class TownsController {
    private readonly townsService;
    constructor(townsService: TownsService);
    getAllTowns(): Promise<Town[]>;
    getTownById(id: string): Promise<Town | null>;
    getTownsByCountry(countryId: string): Promise<Town[]>;
    createTown(town: Prisma.TownCreateInput): Promise<Town>;
    updateTown(id: string, townData: Prisma.TownUpdateInput): Promise<Town>;
    deleteTown(id: string): Promise<Town>;
}
