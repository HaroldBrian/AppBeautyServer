import { MeetService } from './meet.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
export declare class MeetController {
    private readonly meetService;
    constructor(meetService: MeetService);
    create(createMeetDto: CreateMeetDto): Promise<{
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
    findOne(id: string): Promise<{
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
    findUserMeets(params: {
        userId: string;
    }, query: {
        status?: string;
        limit?: number;
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
    update(id: string, updateMeetDto: UpdateMeetDto): Promise<{
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
    remove(id: string): Promise<{
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
