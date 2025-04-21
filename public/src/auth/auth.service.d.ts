import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from 'src/users/users.dto';
import { VerifyOtpDto } from './auth.dto';
import { JwtPayload } from './jwt.strategy';
interface FormatLogin extends Partial<User> {
    email: string;
}
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerProvider(userDto: SignupDto): Promise<RegistrationStatus>;
    registerCustomer(userDto: SignupDto): Promise<RegistrationStatus>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<any>;
    registerAdmin(userDto: SignupDto): Promise<RegistrationStatus>;
    login(loginUserDto: LoginDto): Promise<any>;
    findByEmail({ email, password }: LoginDto): Promise<FormatLogin>;
    findByPayload({ email }: any): Promise<any>;
    private _createToken;
    validateUser(payload: JwtPayload): Promise<any>;
    forgotPassword(email: string): Promise<any>;
    verifyForgotPasswordOtp(email: string, otp: string): Promise<any>;
    resetPassword(email: string, newPasword: string): Promise<any>;
}
export interface RegistrationStatus {
    success: boolean;
    message: string;
    data?: User;
}
export interface RegistrationSeederStatus {
    success: boolean;
    message: string;
    data?: User[];
}
export {};
