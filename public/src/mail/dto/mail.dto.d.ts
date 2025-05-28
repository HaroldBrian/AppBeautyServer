export declare class AttachmentDto {
    filename: string;
    path: string;
}
export declare class SendMailDto {
    to: string;
    subject: string;
    template: string;
    context?: Record<string, any>;
    attachments?: AttachmentDto[];
}
export declare class BulkMailDto {
    recipients: string[];
    subject: string;
    template: string;
    context?: Record<string, any>;
}
