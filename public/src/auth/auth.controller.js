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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_dto_1 = require("../users/users.dto");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerAdmin(signupDto) {
        const result = await this.authService.registerAdmin(signupDto);
        if (!result.success) {
            throw new common_1.HttpException(result.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    async registerProvider(signupDto) {
        const result = await this.authService.registerProvider(signupDto);
        if (!result.success) {
            throw new common_1.HttpException(result.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    async registerClient(signupDto) {
        const result = await this.authService.registerCustomer(signupDto);
        if (!result.success) {
            throw new common_1.HttpException(result.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    async login(loginDto) {
        return await this.authService.login(loginDto);
    }
    async verifyOtp(verifyOtpDto) {
        return await this.authService.verifyOtp(verifyOtpDto);
    }
    async forgotPassword(data) {
        return await this.authService.forgotPassword(data.email);
    }
    async verifyForgotPasswordOtp(data) {
        return await this.authService.verifyForgotPasswordOtp(data.email, data.otp);
    }
    async resetPassword(data) {
        return await this.authService.resetPassword(data.email, data.newPassword);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup/admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Post)('signup/provider'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerProvider", null);
__decorate([
    (0, common_1.Post)('signup/client'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerClient", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('password-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyForgotPasswordOtp", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication flow'),
    (0, common_1.Controller)('api/v1/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map