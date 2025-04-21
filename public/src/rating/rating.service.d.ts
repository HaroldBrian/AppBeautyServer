import { PrismaService } from '../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
export declare class RatingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRatingDto: CreateRatingDto): import(".prisma/client").Prisma.Prisma__RatingClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        meetId: number;
        notation: number;
        comment: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        meetId: number;
        notation: number;
        comment: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__RatingClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        meetId: number;
        notation: number;
        comment: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findUserRatings(query: {
        userId: number | string;
        status?: string;
        limit?: number | string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        meetId: number;
        notation: number;
        comment: string;
    }[]>;
    update(id: number, updateRatingDto: CreateRatingDto): import(".prisma/client").Prisma.Prisma__RatingClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        meetId: number;
        notation: number;
        comment: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__RatingClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        meetId: number;
        notation: number;
        comment: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
