import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Param, Res, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';
import { GuardPublic } from '../../guard/guard.decorator';

class FileUploadDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	file: any;
}

@ApiTags('Image')
@Controller('image')
export class ImageController {
	@Get(':name')
	@GuardPublic()
	getImage(@Param('name') name: string, @Res() res: Response) {
		return res.sendFile(name, { root: './assets/image' });
	}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@GuardPublic()
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		type: FileUploadDto,
	})
	uploadFile(@UploadedFile() file: any) {
		return { filename: file.filename };
	}
}
