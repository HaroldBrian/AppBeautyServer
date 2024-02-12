/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

// single image
export const storeImage = async (
  image: Express.Multer.File,
): Promise<string> => {
  const writeFile = util.promisify(fs.writeFile);
  const fileName = `${Date.now()}-${image.originalname}`;
  const filepath = path.join(__dirname, '..', '..', 'uploads', fileName);

  try {
    await writeFile(filepath, image.buffer);
  } catch (error) {
    throw new BadRequestException('Failed to store the image');
  }

  return fileName;
};

// multiple images
export const storeImages = async (
  images: Express.Multer.File[],
): Promise<string[]> => {
    const writeFile = util.promisify(fs.writeFile);
    const uploadedImages: string[] = [];

    for (const image of images) {
      const fileName = `${Date.now()}-${image.originalname}`;
      const filePath = path.join(__dirname, '..', '..', 'uploads', fileName);

      try {
        await writeFile(filePath, image.buffer);
        uploadedImages.push(fileName);
      } catch (error) {
        throw new BadRequestException('Failed to store the images');
      }
    }

    return uploadedImages;
};
