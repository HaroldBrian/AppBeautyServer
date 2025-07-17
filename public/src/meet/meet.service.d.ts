import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
export declare class MeetService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findUserMeets(query: {
        userId: number | string;
        status?: string;
        limit?: number | string;
    }): Promise<{
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(data: CreateMeetDto): Promise<{
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, data: UpdateMeetDto): Promise<{
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        hour: string;
        place: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
