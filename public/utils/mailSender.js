"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailSender = void 0;
const nodemailer = require("nodemailer");
const mailSender = async (email, subject, body) => {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
        throw new Error('Email configuration environment variables are not set');
    }
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        });
        let info = await transporter.sendMail({
            from: `"Beautify" <${process.env.MAIL_USER}>`,
            to: email,
            subject: subject,
            html: body,
        });
        return info;
    }
    catch (error) {
        console.error("Error sending email: ", error);
        throw new Error('Failed to send email');
    }
};
exports.mailSender = mailSender;
//# sourceMappingURL=mailSender.js.map