"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    mail: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT ?? '587', 10),
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        from: process.env.MAIL_FROM,
    },
});
//# sourceMappingURL=mail.config.js.map