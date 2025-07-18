/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(){
        super();
    }

    async onModuleDestroy() {
        await this.$connect();
    }

    async onModuleInit() {
        await this.$disconnect()
    }
    
}
