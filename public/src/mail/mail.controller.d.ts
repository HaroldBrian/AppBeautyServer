import { MailService } from './mail.service';
import { SendMailDto, BulkMailDto } from './dto/mail.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendMail(body: SendMailDto): Promise<{
        message: string;
    }>;
    sendBulk(body: BulkMailDto): Promise<{
        message: string;
    }>;
}
