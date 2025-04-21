import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
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
    findOne(id: string): Promise<{
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
    findByShop(id: string): Promise<({
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
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
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
    remove(id: string): Promise<{
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
