import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto';
export declare class ProductCategoryService {
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
    create(data: CreateProductCategoryDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
    update(id: number, data: UpdateProductCategoryDto): Promise<{
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
