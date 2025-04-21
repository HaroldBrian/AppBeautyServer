import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto';
export declare class ServiceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }[]>;
    findOne(id: number): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }>;
    findShopServices(query: {
        shopId: number | string;
        isVisible?: boolean;
        limit?: number | string;
    }): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }[]>;
    findCategoryServices(query: {
        categoryId: number | string;
        isVisible?: boolean;
        limit?: number | string;
    }): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }[]>;
    create(data: CreateServiceDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }>;
    update(id: number, data: Prisma.ServiceUpdateInput): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }>;
    delete(id: number): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }>;
}
