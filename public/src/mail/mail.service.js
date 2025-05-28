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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const hbs = require("handlebars");
const fs = require("fs");
const path = require("path");
let MailService = MailService_1 = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(MailService_1.name);
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('mail.host'),
            port: this.configService.get('mail.port'),
            secure: false,
            auth: {
                user: this.configService.get('mail.user'),
                pass: this.configService.get('mail.pass'),
            },
        });
        this.registerPartials();
    }
    registerPartials() {
        const partialsDir = path.join(__dirname, '..', '..', 'src', 'mail', 'templates', 'partials');
        if (!fs.existsSync(partialsDir)) {
            this.logger.warn(`Le répertoire des partials est introuvable : ${partialsDir}`);
            return;
        }
        const filenames = fs.readdirSync(partialsDir);
        filenames.forEach((filename) => {
            const partialName = path.parse(filename).name;
            const filePath = path.join(partialsDir, filename);
            const partialContent = fs.readFileSync(filePath, 'utf-8');
            hbs.registerPartial(partialName, partialContent);
        });
    }
    async parseTemplate(templateName, context) {
        const baseDir = path.join(__dirname, '..', '..', 'src', 'mail', 'templates');
        const filePath = path.join(baseDir, `${templateName}.hbs`);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Template file not found: ${filePath}`);
        }
        const source = fs.readFileSync(filePath, 'utf-8');
        const compiled = hbs.compile(source);
        return compiled(context);
    }
    async sendMail(to, subject, templateName, context = {}, attachments = []) {
        try {
            const html = await this.parseTemplate(templateName, context);
            const mailOptions = {
                from: this.configService.get('mail.from'),
                to,
                subject,
                html,
                context: {
                    ...context,
                    year: new Date().getFullYear(),
                },
                attachments,
            };
            const info = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email sent to ${to}: ${info.messageId}`);
            this.logger.debug(`Sending email to ${to} with template ${templateName}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}`, error.stack);
            throw new common_1.InternalServerErrorException('Unable to send email');
        }
    }
    async sendBulkEmails(recipients, subject, templateName, globalContext = {}) {
        for (const to of recipients) {
            await this.sendMail(to, subject, templateName, globalContext);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map