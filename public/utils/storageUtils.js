"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeImages = exports.storeImage = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const util = require("util");
const storeImage = async (image) => {
    const writeFile = util.promisify(fs.writeFile);
    const fileName = `${Date.now()}-${image.originalname}`;
    const filepath = path.join(__dirname, '..', '..', 'uploads', fileName);
    try {
        await writeFile(filepath, image.buffer);
    }
    catch (error) {
        throw new common_1.BadRequestException('Failed to store the image');
    }
    return fileName;
};
exports.storeImage = storeImage;
const storeImages = async (images) => {
    const writeFile = util.promisify(fs.writeFile);
    const uploadedImages = [];
    for (const image of images) {
        const fileName = `${Date.now()}-${image.originalname}`;
        const filePath = path.join(__dirname, '..', '..', 'uploads', fileName);
        try {
            await writeFile(filePath, image.buffer);
            uploadedImages.push(fileName);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to store the images');
        }
    }
    return uploadedImages;
};
exports.storeImages = storeImages;
//# sourceMappingURL=storageUtils.js.map