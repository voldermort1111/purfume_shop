import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EEnvType } from '../constants/env.type';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
			validationSchema: Joi.object({
				[EEnvType.NODE_ENV]: Joi.string()
					.valid('development', 'production', 'test', 'provision')
					.default('development')
					.trim()
					.required(),
				[EEnvType.PORT]: Joi.number().default(3000).required(),
				[EEnvType.SWAGGER_PATH]: Joi.string(),
				[EEnvType.GLOBAL_PREFIX]: Joi.string(),
				[EEnvType.DATABASE_HOST]: Joi.string(),
				[EEnvType.DATABASE_USER]: Joi.string(),
				[EEnvType.DATABASE_PORT]: Joi.number().min(1000),
				[EEnvType.DATABASE]: Joi.string(),
				[EEnvType.SECRET_JWT]: Joi.string().required(),
				[EEnvType.REFRESH_TOKEN_SECRET_JWT]: Joi.string().required(),
				[EEnvType.HASH_ITERATIONS]: Joi.number().min(1000),
				[EEnvType.HASH_SALT]: Joi.string().required(),
			}),
		}),
	],
})
export class CustomConfigModule {}
