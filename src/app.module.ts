import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './country/country.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductModule } from './product/product.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { ServiceModule } from './service/service.module';
import { ShopModule } from './shop/shop.module';
import { TownsModule } from './towns/towns.module';
import { UsersModule } from './users/users.module';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PaymentsModule } from './payments/payments.module';
import { MeetModule } from './meet/meet.module';
import { OrderModule } from './order/order.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    CountryModule,
    TownsModule,
    ProductCategoryModule,
    ServiceCategoryModule,
    ServiceModule,
    ShopModule,
    ProductModule,
    PaymentsModule,
    SubscriptionPlanModule,
    SubscriptionModule,
    MeetModule,
    OrderModule,
    RatingModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
