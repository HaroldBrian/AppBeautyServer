/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import * as otpGenerator from 'otp-generator';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from 'src/users/users.dto';
import { MailService } from 'src/mail/mail.service';
import { VerifyOtpDto } from './auth.dto';
import { JwtPayload } from './jwt.strategy';

interface FormatLogin extends Partial<User> {
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registerProvider(userDto: SignupDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'account created successfully',
    };

    try {
      const userExist = await this.prisma.user.findFirst({
        where: { email: userDto.email },
      });

      if (userExist) {
        throw new HttpException(
          `User ${userDto.email} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      status.data = await this.prisma.user.create({
        data: {
          ...userDto,
          role: 'PROVIDER' as const,
          password: await hash(userDto.password, 10),
        },
      });
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async registerCustomer(userDto: SignupDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'account created successfully',
    };

    try {
      const userExist = await this.prisma.user.findFirst({
        where: { email: userDto.email },
      });

      if (userExist) {
        throw new HttpException(
          `User ${userDto.email} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const user = await this.prisma.user.create({
        data: {
          ...userDto,
          role: 'CLIENT' as const,
          status: false,
          password: await hash(userDto.password, 10),
          otp,
        },
      });

      // Envoi de l'email de Vérification
      await this.mailService.sendMail(
        user.email,
        'Vérification de votre compte',
        'email-otp',
        {
          name: `${user.name}`,
          otpCode: otp,
          expirationMinutes: 10,
        },
      );

      status.data = user;
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  // --- verify user creation OTP
  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<any> {
    const { email, otp } = verifyOtpDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.otp !== otp) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.user.update({
      where: { email },
      data: {
        otp: null,
        status: true,
      },
    });

    // Envoi de l'email de bienvenue
    await this.mailService.sendMail(
      user.email,
      'Bienvenue sur TopNyanga',
      'welcome',
      {
        name: `${user.name}`,
      },
    );

    return { message: 'OTP verified successfully' };
  }

  async registerAdmin(userDto: SignupDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'account created successfully',
    };

    try {
      const userExist = await this.prisma.user.findFirst({
        where: { email: userDto.email },
      });

      if (userExist) {
        throw new HttpException(
          `User ${userDto.email} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      status.data = await this.prisma.user.create({
        data: {
          ...userDto,
          role: 'ADMIN' as const,
          password: await hash(userDto.password, 10),
        },
      });
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginDto): Promise<any> {
    const user = await this.findByEmail(loginUserDto);
    const token = this._createToken(user);

    return {
      ...token,
      data: user,
    };
  }

  // login functionality
  async findByEmail({ email, password }: LoginDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    } else if (user.status === false) {
      throw new HttpException(
        'Your account is blocked or not verified',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // compare password
    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: p, ...rest } = user;
    return rest;
  }

  // --- findByEmail
  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  private _createToken({ email }): any {
    const user: JwtPayload = { email };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await this.prisma.user.update({
      where: { email },
      data: {
        resetPasswordOtp: otp,
        resetPasswordExpires: new Date(Date.now() + 3600000),
      },
    });

    // Envoi de l'email de réinitialisation de mot de passe
    await this.mailService.sendMail(
      user.email,
      'Réinitialisation de votre mot de passe',
      'password-reset',
      {
        name: `${user.name}`,
        otpCode: otp,
        expirationMinutes: 10,
      },
    );

    return { message: 'Reset OTP sent successfully' };
  }

  // --- forgot password OTP
  async verifyForgotPasswordOtp(email: string, otp: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (
      !user ||
      user.resetPasswordOtp !== otp ||
      new Date() > user.resetPasswordExpires
    ) {
      throw new HttpException('Invalid or expired OTP', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.user.update({
      where: { email },
      data: { resetPasswordExpires: null },
    });

    return { message: 'Your password has been reset successfully' };
  }

  async resetPassword(email: string, newPasword: string): Promise<any> {
    const user = this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!(await user).resetPasswordOtp) {
      throw new HttpException(
        'You need to follow the right process to reset your password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hash(newPasword, 10);

    await this.prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetPasswordOtp: null,
        resetPasswordExpires: null,
      },
    });

    return { message: 'Your password has been reset successfully' };
  }
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
