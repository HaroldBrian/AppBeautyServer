import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './country/country.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { TownsModule } from './towns/towns.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, CountryModule, TownsModule, ProductCategoryModule, ServiceCategoryModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
