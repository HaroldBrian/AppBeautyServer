import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
export declare class ScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createScheduleDto: CreateScheduleDto): import(".prisma/client").Prisma.Prisma__ScheduleClient<{
        event: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        start_date: Date;
        end_date: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        event: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        start_date: Date;
        end_date: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ScheduleClient<{
        event: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        start_date: Date;
        end_date: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateScheduleDto: CreateScheduleDto): import(".prisma/client").Prisma.Prisma__ScheduleClient<{
        event: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        start_date: Date;
        end_date: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ScheduleClient<{
        event: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        start_date: Date;
        end_date: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
