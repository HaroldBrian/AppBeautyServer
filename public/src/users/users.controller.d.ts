import { UpdatePasswordDto, UpdateProfileDto } from './users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    profile(req: any): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    users(): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    admin(): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    providers(): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    clients(): Promise<{
        email: string;
        name: string;
        telephone: string;
        surname: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    updatePassword(req: any, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<{
        email: string;
        password: string;
        name: string;
        telephone: string;
        surname: string;
        address: string;
        description: string;
        logo: string;
        id: number;
        otp: string;
        resetPasswordOtp: string;
        resetPasswordExpires: Date;
        role: import(".prisma/client").$Enums.Role;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
