/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto, UpdatePasswordDto } from './users.dto';

interface FormatLogin extends Partial<User> {
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // to change the user password
  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare password
    const areEqual = await compare(payload.old_password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }

  // register admin
  async createAdmin(userDto: SignupDto): Promise<any> {
    // check if user already exists
    const userExist = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });

    if (userExist) {
      throw new HttpException(
        `User ${userDto.email} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    return await this.prisma.user.create({
      data: {
        ...userDto,
        role: 'ADMIN' as const,
        password: await hash(userDto.password, 10),
      },
    });
  }

  // register provider
  async createProvider(userDto: SignupDto): Promise<any> {
    // check if user already exists
    const userExist = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });

    if (userExist) {
      throw new HttpException(
        `User ${userDto.email} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    return await this.prisma.user.create({
      data: {
        ...userDto,
        role: 'PROVIDER' as const,
        password: await hash(userDto.password, 10),
      },
    });
  }

  // register customer
  async createCustomer(userDto: SignupDto): Promise<any> {
    // check if user already exists
    const userExist = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });

    if (userExist) {
      throw new HttpException(
        `User ${userDto.email} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    return await this.prisma.user.create({
      data: {
        ...userDto,
        role: 'CLIENT' as const,
        password: await hash(userDto.password, 10),
      },
    });
  }

  // login functionality
  async findByEmail({ email, password }: LoginDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
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

  // find by email and password
  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async profile(user_id: number) {
    return await this.prisma.user.findFirst({
      where: { id: user_id },
      select: {
        name: true,
        email: true,
        surname: true,
        telephone: true,
        role: true,
      },
    });
  }
}
