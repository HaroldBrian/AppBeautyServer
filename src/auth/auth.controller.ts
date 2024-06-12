import { UsersService } from './../users/users.service';
/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto, VerifyOtpDto } from 'src/users/users.dto';
import { AuthService, RegistrationStatus } from './auth.service';

@ApiTags('Authentication flow')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,

  ) {}

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

  @Post('verify-otp')
  public async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<any> {
    return await this.userService.verifyOtp(verifyOtpDto);
  }
}
