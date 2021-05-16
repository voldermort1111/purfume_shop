import { MAX_IMAGE_SIZE } from './../../constants/api.constants';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ImageController } from './image.controller';
import { ConfigModule } from '@nestjs/config';

const editFileName = (req, file, callback) => {
	const filename = uuidv4() + extname(file.originalname);
	callback(null, filename);
};

@Module({
	imports: [
		MulterModule.registerAsync({
			useFactory: () => ({
				storage: diskStorage({
					destination: './assets/image',
					filename: editFileName.bind(this),
				}),
				fileFilter: (req, file, callback) => {
					if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
						return callback(new Error('Only image files are allowed!'), false);
					}
					callback(null, true);
				},
				limits: {
					fileSize: MAX_IMAGE_SIZE,
					files: 1,
				},
			}),
		}),
		ConfigModule,
	],
	controllers: [ImageController],
})
export class ImageModule {}
