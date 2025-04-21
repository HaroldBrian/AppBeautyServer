import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        description: string;
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        price: number;
        discount: number;
        images: import("@prisma/client/runtime/library").JsonValue;
        shopId: number;
        productCategoryId: number;
    }>;
    findAll(): Promise<({
        productCategory: {
            description: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            image: string;
        };
        shop: {
            name: string;
            description: string;
            logo: string;
            id: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            images: import("@prisma/client/runtime/library").JsonValue;
            userId: number;
            location: string;
            phoneNumber: string;
            website: string;
            socialNetworks: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        name: string;
        description: string;
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        price: number;
        discount: number;
        images: import("@prisma/client/runtime/library").JsonValue;
        shopId: number;
        productCategoryId: number;
    })[]>;
    findOne(id: number): Promise<{
        productCategory: {
            description: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            image: string;
        };
        shop: {
            name: string;
            description: string;
            logo: string;
            id: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            images: import("@prisma/client/runtime/library").JsonValue;
            userId: number;
            location: string;
            phoneNumber: string;
            website: string;
            socialNetworks: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        name: string;
        description: string;
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        price: number;
        discount: number;
        images: import("@prisma/client/runtime/library").JsonValue;
        shopId: number;
        productCategoryId: number;
    }>;
    findByShop(id: number): Promise<({
        productCategory: {
            description: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            image: string;
        };
        shop: {
            name: string;
            description: string;
            logo: string;
            id: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            images: import("@prisma/client/runtime/library").JsonValue;
            userId: number;
            location: string;
            phoneNumber: string;
            website: string;
            socialNetworks: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        name: string;
        description: string;
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        price: number;
        discount: number;
        images: import("@prisma/client/runtime/library").JsonValue;
        shopId: number;
        productCategoryId: number;
    })[]>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        description: string;
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        price: number;
        discount: number;
        images: import("@prisma/client/runtime/library").JsonValue;
        shopId: number;
        productCategoryId: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string;
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        price: number;
        discount: number;
        images: import("@prisma/client/runtime/library").JsonValue;
        shopId: number;
        productCategoryId: number;
    }>;
}
