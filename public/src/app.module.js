"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const country_module_1 = require("./country/country.module");
const prisma_module_1 = require("./prisma/prisma.module");
const prisma_service_1 = require("./prisma/prisma.service");
const product_category_module_1 = require("./product-category/product-category.module");
const product_module_1 = require("./product/product.module");
const service_category_module_1 = require("./service-category/service-category.module");
const service_module_1 = require("./service/service.module");
const shop_module_1 = require("./shop/shop.module");
const towns_module_1 = require("./towns/towns.module");
const users_module_1 = require("./users/users.module");
const subscription_plan_module_1 = require("./subscription-plan/subscription-plan.module");
const subscription_module_1 = require("./subscription/subscription.module");
const payments_module_1 = require("./payments/payments.module");
const meet_module_1 = require("./meet/meet.module");
const order_module_1 = require("./order/order.module");
const rating_module_1 = require("./rating/rating.module");
const mail_module_1 = require("./mail/mail.module");
const mail_config_1 = require("./mail/config/mail.config");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [mail_config_1.default],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            prisma_module_1.PrismaModule,
            country_module_1.CountryModule,
            towns_module_1.TownsModule,
            product_category_module_1.ProductCategoryModule,
            service_category_module_1.ServiceCategoryModule,
            service_module_1.ServiceModule,
            shop_module_1.ShopModule,
            product_module_1.ProductModule,
            payments_module_1.PaymentsModule,
            subscription_plan_module_1.SubscriptionPlanModule,
            subscription_module_1.SubscriptionModule,
            meet_module_1.MeetModule,
            order_module_1.OrderModule,
            rating_module_1.RatingModule,
            mail_module_1.MailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map