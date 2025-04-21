/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="multer" />
export declare const storeImage: (image: Express.Multer.File) => Promise<string>;
export declare const storeImages: (images: Express.Multer.File[]) => Promise<string[]>;
