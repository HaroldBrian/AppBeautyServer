import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopService } from './shop.service';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    create(createShopDto: CreateShopDto): Promise<{
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
    }>;
    findAll(): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    findUserShops(params: {
        userId: string;
    }, query: {
        status?: "active" | "inactive";
        limit?: number;
    }): Promise<{
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
    }[]>;
    update(id: string, updateShopDto: UpdateShopDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
