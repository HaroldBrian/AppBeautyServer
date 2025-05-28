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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const otpGenerator = require("otp-generator");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, mailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async registerProvider(userDto) {
        let status = {
            success: true,
            message: 'account created successfully',
        };
        try {
            const userExist = await this.prisma.user.findFirst({
                where: { email: userDto.email },
            });
            if (userExist) {
                throw new common_1.HttpException(`User ${userDto.email} already exists`, common_1.HttpStatus.CONFLICT);
            }
            status.data = await this.prisma.user.create({
                data: {
                    ...userDto,
                    role: 'PROVIDER',
                    password: await (0, bcrypt_1.hash)(userDto.password, 10),
                },
            });
        }
        catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }
    async registerCustomer(userDto) {
        let status = {
            success: true,
            message: 'account created successfully',
        };
        try {
            const userExist = await this.prisma.user.findFirst({
                where: { email: userDto.email },
            });
            if (userExist) {
                throw new common_1.HttpException(`User ${userDto.email} already exists`, common_1.HttpStatus.CONFLICT);
            }
            const otp = otpGenerator.generate(4, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            const user = await this.prisma.user.create({
                data: {
                    ...userDto,
                    role: 'CLIENT',
                    status: false,
                    password: await (0, bcrypt_1.hash)(userDto.password, 10),
                    otp,
                },
            });
            await this.mailService.sendMail(user.email, 'Vérification de votre compte', 'email-otp', {
                name: `${user.name}`,
                otpCode: otp,
                expirationMinutes: 10,
            });
            status.data = user;
        }
        catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }
    async verifyOtp(verifyOtpDto) {
        const { email, otp } = verifyOtpDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.otp !== otp) {
            throw new common_1.HttpException('Invalid OTP', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.prisma.user.update({
            where: { email },
            data: {
                otp: null,
                status: true,
            },
        });
        await this.mailService.sendMail(user.email, 'Bienvenue sur TopNyanga', 'welcome', {
            name: `${user.name}`,
        });
        return { message: 'OTP verified successfully' };
    }
    async registerAdmin(userDto) {
        let status = {
            success: true,
            message: 'account created successfully',
        };
        try {
            const userExist = await this.prisma.user.findFirst({
                where: { email: userDto.email },
            });
            if (userExist) {
                throw new common_1.HttpException(`User ${userDto.email} already exists`, common_1.HttpStatus.CONFLICT);
            }
            status.data = await this.prisma.user.create({
                data: {
                    ...userDto,
                    role: 'ADMIN',
                    password: await (0, bcrypt_1.hash)(userDto.password, 10),
                },
            });
        }
        catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }
    async login(loginUserDto) {
        const user = await this.findByEmail(loginUserDto);
        const token = this._createToken(user);
        return {
            ...token,
            data: user,
        };
    }
    async findByEmail({ email, password }) {
        const user = await this.prisma.user.findFirst({
            where: { email },
        });
        if (!user) {
            throw new common_1.HttpException('invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        else if (user.status === false) {
            throw new common_1.HttpException('Your account is blocked or not verified', common_1.HttpStatus.UNAUTHORIZED);
        }
        const areEqual = await (0, bcrypt_1.compare)(password, user.password);
        if (!areEqual) {
            throw new common_1.HttpException('invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { password: p, ...rest } = user;
        return rest;
    }
    async findByPayload({ email }) {
        return await this.prisma.user.findFirst({
            where: { email },
        });
    }
    _createToken({ email }) {
        const user = { email };
        const Authorization = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN,
            Authorization,
        };
    }
    async validateUser(payload) {
        const user = await this.findByPayload(payload);
        if (!user) {
            throw new common_1.HttpException('INVALID_TOKEN', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findFirst({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        await this.prisma.user.update({
            where: { email },
            data: {
                resetPasswordOtp: otp,
                resetPasswordExpires: new Date(Date.now() + 3600000),
            },
        });
        await this.mailService.sendMail(user.email, 'Réinitialisation de votre mot de passe', 'password-reset', {
            name: `${user.name}`,
            otpCode: otp,
            expirationMinutes: 10,
        });
        return { message: 'Reset OTP sent successfully' };
    }
    async verifyForgotPasswordOtp(email, otp) {
        const user = await this.prisma.user.findFirst({ where: { email } });
        if (!user ||
            user.resetPasswordOtp !== otp ||
            new Date() > user.resetPasswordExpires) {
            throw new common_1.HttpException('Invalid or expired OTP', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.prisma.user.update({
            where: { email },
            data: { resetPasswordExpires: null },
        });
        return { message: 'Your password has been reset successfully' };
    }
    async resetPassword(email, newPasword) {
        const user = this.prisma.user.findFirst({
            where: { email },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (!(await user).resetPasswordOtp) {
            throw new common_1.HttpException('You need to follow the right process to reset your password', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await (0, bcrypt_1.hash)(newPasword, 10);
        await this.prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                resetPasswordOtp: null,
                resetPasswordExpires: null,
            },
        });
        return { message: 'Your password has been reset successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map