import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import KNN from 'algorithms/Knn';
import { AppModule } from './app.module';
import { EEnvType } from './constants/env.type';
import { initSwagger } from './swagger';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	app.setGlobalPrefix('api');
	app.enableCors();

	// Swagger
	initSwagger(app, configService.get(EEnvType.SWAGGER_PATH));

	await app.listen(configService.get('PORT'));

	// Hot-reload
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();

// var train_dataset = [
// 	[0, 0, 0],
// 	[0, 1, 1],
// 	[1, 1, 0],
// 	[2, 2, 2],
// 	[1, 2, 2],
// 	[2, 1, 2],
// ];
// var train_labels = [0, 0, 0, 5, 4, 1];
// var knn = new KNN(train_dataset, train_labels, { k: 2 });

// var test_dataset = [
// 	[0.9, 0.9, 0.9],
// 	[1.1, 1.1, 1.1],
// 	[1.1, 1.1, 1.2],
// 	[1.2, 1.2, 1.2],
// ];

// var ans = knn.predict(test_dataset);
// console.log(knn.toJSON());
// console.log(ans);
