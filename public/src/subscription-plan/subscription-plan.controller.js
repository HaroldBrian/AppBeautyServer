"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanController = void 0;
const common_1 = require("@nestjs/common");
const subscription_plan_service_1 = require("./subscription-plan.service");
const create_subscription_plan_dto_1 = require("./dto/create-subscription-plan.dto");
const update_subscription_plan_dto_1 = require("./dto/update-subscription-plan.dto");
const swagger_1 = require("@nestjs/swagger");
(0, swagger_1.ApiTags)('Subscription Plan Management');
let SubscriptionPlanController = class SubscriptionPlanController {
    constructor(subscriptionPlanService) {
        this.subscriptionPlanService = subscriptionPlanService;
    }
    create(createSubscriptionPlanDto) {
        return this.subscriptionPlanService.create(createSubscriptionPlanDto);
    }
    findAll() {
        return this.subscriptionPlanService.findAll();
    }
    findOne(id) {
        return this.subscriptionPlanService.findOne(+id);
    }
    update(id, updateSubscriptionPlanDto) {
        return this.subscriptionPlanService.update(+id, updateSubscriptionPlanDto);
    }
    remove(id) {
        return this.subscriptionPlanService.remove(+id);
    }
};
exports.SubscriptionPlanController = SubscriptionPlanController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_plan_dto_1.CreateSubscriptionPlanDto]),
    __metadata("design:returntype", void 0)
], SubscriptionPlanController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionPlanController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscriptionPlanController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subscription_plan_dto_1.UpdateSubscriptionPlanDto]),
    __metadata("design:returntype", void 0)
], SubscriptionPlanController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscriptionPlanController.prototype, "remove", null);
exports.SubscriptionPlanController = SubscriptionPlanController = __decorate([
    (0, common_1.Controller)('api/v1/subscription-plan'),
    __metadata("design:paramtypes", [subscription_plan_service_1.SubscriptionPlanService])
], SubscriptionPlanController);
//# sourceMappingURL=subscription-plan.controller.js.map