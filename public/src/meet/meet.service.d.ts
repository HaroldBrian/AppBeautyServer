import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
export declare class MeetService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
    }>;
    findUserMeets(query: {
        userId: number | string;
        status?: string;
        limit?: number | string;
    }): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
    }[]>;
    create(data: CreateMeetDto): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
    }>;
    update(id: number, data: UpdateMeetDto): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
    }>;
}
