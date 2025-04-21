import { Prisma, Town } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TownsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllTowns(): Promise<Town[]>;
    getTownById(id: number): Promise<Town | null>;
    getTownsByCountry(countryId: number): Promise<Town[]>;
    createTown(data: Prisma.TownCreateInput): Promise<Town>;
    updateTown(id: number, data: Prisma.TownUpdateInput): Promise<Town>;
    deleteTown(id: number): Promise<Town>;
}
