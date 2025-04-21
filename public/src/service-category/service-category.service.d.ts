import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceCategoryDto, UpdateServiceCategoryDto } from './dto';
export declare class ServiceCategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }[]>;
    findOne(id: number): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
    create(data: CreateServiceCategoryDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
    update(id: number, data: UpdateServiceCategoryDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
    remove(id: number): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
}
