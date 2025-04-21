import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): import(".prisma/client").Prisma.Prisma__OrderClient<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        userId: number;
        productId: number;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        userId: number;
        productId: number;
        totalAmount: number;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__OrderClient<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        userId: number;
        productId: number;
        totalAmount: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findByUserId(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        userId: number;
        productId: number;
        totalAmount: number;
    }[]>;
    update(id: string, updateOrderDto: CreateOrderDto): import(".prisma/client").Prisma.Prisma__OrderClient<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        userId: number;
        productId: number;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__OrderClient<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        userId: number;
        productId: number;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
