/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from 'src/users/users.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async registerProvider(userDto: SignupDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'account created successfully',
    };

    try {
      status.data = await this.usersService.createProvider(userDto);
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
      status.data = await this.usersService.createCustomer(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async registerAdmin(userDto: SignupDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'account created successfully',
    };

    try {
      status.data = await this.usersService.createAdmin(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }



  async login(loginUserDto: LoginDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByEmail(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      ...token,
      data: user,
    };
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
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
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
