/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from 'src/users/users.dto';
import { ForgotPasswordDto, ResetPasswordDto, VerifyOtpDto } from './auth.dto';
import { AuthService, RegistrationStatus } from './auth.service';

@ApiTags('Authentication flow')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/admin')
  public async registerAdmin(
    @Body() signupDto: SignupDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.registerAdmin(signupDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('signup/provider')
  public async registerProvider(
    @Body() signupDto: SignupDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.registerProvider(signupDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('signup/client')
  public async registerClient(
    @Body() signupDto: SignupDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.registerCustomer(signupDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }

  @Post('signup-otp')
  public async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<any> {
    return await this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('forgot-password')
  public async forgotPassword(@Body() data: ForgotPasswordDto): Promise<any> {
    return await this.authService.forgotPassword(data.email);
  }

  @Post('password-otp')
  public async verifyForgotPasswordOtp(
    @Body() data: VerifyOtpDto,
  ): Promise<any> {
    return await this.authService.verifyForgotPasswordOtp(data.email, data.otp);
  }

  @Post('reset-password')
  public async resetPassword(@Body() data: ResetPasswordDto): Promise<any> {
    return await this.authService.resetPassword(data.email, data.newPassword);
  }
}
