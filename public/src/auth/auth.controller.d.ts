import { LoginDto, SignupDto } from 'src/users/users.dto';
import { ForgotPasswordDto, ResetPasswordDto, VerifyOtpDto } from './auth.dto';
import { AuthService, RegistrationStatus } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerAdmin(signupDto: SignupDto): Promise<RegistrationStatus>;
    registerProvider(signupDto: SignupDto): Promise<RegistrationStatus>;
    registerClient(signupDto: SignupDto): Promise<RegistrationStatus>;
    login(loginDto: LoginDto): Promise<any>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<any>;
    forgotPassword(data: ForgotPasswordDto): Promise<any>;
    verifyForgotPasswordOtp(data: VerifyOtpDto): Promise<any>;
    resetPassword(data: ResetPasswordDto): Promise<any>;
}
