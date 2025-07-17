import { MeetService } from './meet.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
export declare class MeetController {
    private readonly meetService;
    constructor(meetService: MeetService);
    create(createMeetDto: CreateMeetDto): Promise<{
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
    findOne(id: string): Promise<{
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
    findUserMeets(params: {
        userId: string;
    }, query: {
        status?: string;
        limit?: number;
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
    update(id: string, updateMeetDto: UpdateMeetDto): Promise<{
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
    remove(id: string): Promise<{
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
