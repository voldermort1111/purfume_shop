import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
	.setTitle('Livepeek')
	.setDescription('Livepeek API description')
	.setVersion('1.0')
	.addTag('live-peek')
	.addBearerAuth()
	.build();

export function initSwagger(app: INestApplication, path?: string) {
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(path || 'api-document', app, document);
}
