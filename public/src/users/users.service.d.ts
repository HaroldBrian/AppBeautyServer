import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePasswordDto, UpdateProfileDto } from './users.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    updatePassword(payload: UpdatePasswordDto, id: number): Promise<User>;
    updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<User>;
    profile(user_id: number): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getUsers(): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    getClients(): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    getProviders(): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    getAdmins(): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
}
