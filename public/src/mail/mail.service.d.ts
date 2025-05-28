import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private configService;
    private transporter;
    private readonly logger;
    constructor(configService: ConfigService);
    private registerPartials;
    private parseTemplate;
    sendMail(to: string, subject: string, templateName: string, context?: any, attachments?: any[]): Promise<void>;
    sendBulkEmails(recipients: string[], subject: string, templateName: string, globalContext?: any): Promise<void>;
}
