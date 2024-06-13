/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePasswordDto } from './users.dto';


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

  // get all users
  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        surname: true,
        telephone: true,
        role: true,
      },
    });
  }

  // get all clients
  async getClients() {
    return await this.prisma.user.findMany({
      where: { role: 'CLIENT' },
      select: {
        id: true,
        name: true,
        email: true,
        surname: true,
        telephone: true,
        role: true,
      },
    });
  }

  // get all providers
  async getProviders() {
    return await this.prisma.user.findMany({
      where: { role: 'PROVIDER' },
      select: {
        id: true,
        name: true,
        email: true,
        surname: true,
        telephone: true,
        role: true,
      },
    });
  }

  // get all admin
  async getAdmins() {
    return await this.prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        name: true,
        email: true,
        surname: true,
        telephone: true,
        role: true,
      },
    });
  }
}
