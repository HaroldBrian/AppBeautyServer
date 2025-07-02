import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
import { mailSender } from 'utils/mailSender';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MeetService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.meet.findMany();
  }

  async findOne(id: number) {
    return this.prisma.meet.findUnique({ where: { id } });
  }

  async findUserMeets(query: {
    userId: number | string;
    status?: string;
    limit?: number | string;
  }) {
    let userId = Number(query.userId);

    if (isNaN(userId) || userId <= 0) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    const limit = query.limit ? Number(query.limit) : undefined;

    if (limit && (isNaN(limit) || limit <= 0)) {
      throw new HttpException(
        'Limit must be a positive number',
        HttpStatus.BAD_REQUEST,
      );
    }

    const filters: any = {
      userId: userId,
    };

    if (query.status) {
      filters.status = query.status;
    }

    console.log('Filtres envoyés à Prisma :', filters);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const meets = await this.prisma.meet.findMany({
      where: filters,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });

    return meets;
  }

  async create(data: CreateMeetDto) {
    // Sending message to confirm meet to shop user
    const service = await this.prisma.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    const shop = await this.prisma.shop.findUnique({
      where: { id: service.shopId },
    });

    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }

    const userShop = await this.prisma.user.findUnique({
      where: { id: shop.userId },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    const createMeet = await this.prisma.meet.create({ data: { ...data } });

    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'src',
      'templates',
      'meet-pending.html',
    );
    let template = fs.readFileSync(templatePath, 'utf8');

    await mailSender(
      userShop.email,
      'Nouvelle demande de rendez-vous',
      template,
    );

    await mailSender(user.email, 'Nouvelle demande de rendez-vous', template);
    // ending send message function

    return createMeet;
  }

  async update(id: number, data: UpdateMeetDto) {
    // Récupérer d'abord le rendez-vous existant
    const existingMeet = await this.prisma.meet.findUnique({
      where: { id },
    });

    if (!existingMeet) {
      throw new HttpException('Meet not found', HttpStatus.NOT_FOUND);
    }

    // Utiliser le serviceId du rendez-vous existant ou celui fourni dans data
    const serviceId = data.serviceId || existingMeet.serviceId;

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    const shop = await this.prisma.shop.findUnique({
      where: { id: service.shopId },
    });

    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }

    const userShop = await this.prisma.user.findUnique({
      where: { id: shop.userId },
    });

    // Utiliser le userId du rendez-vous existant ou celui fourni dans data
    const userId = data.userId || existingMeet.userId;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const updateMeet = await this.prisma.meet.update({ where: { id }, data });

    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'src',
      'templates',
      'meet-update.html',
    );
    let template = fs.readFileSync(templatePath, 'utf8');

    await mailSender(userShop.email, 'Modification de rendez-vous', template);

    await mailSender(user.email, 'Modification de rendez-vous', template);
    // ending send message function

    return updateMeet;
  }

  async remove(id: number) {
    const data = await this.prisma.meet.findUnique({
      where: { id },
    });

    if (!data)
      throw new HttpException(
        "There's no meet with id " + id,
        HttpStatus.NOT_FOUND,
      );

    return this.prisma.meet.delete({ where: { id } });
  }
}
