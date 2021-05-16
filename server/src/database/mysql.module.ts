import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EEnvType } from './../constants/env.type';
import { getConnectionOptions } from 'typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const connectionOptions = await getConnectionOptions();
				return Object.assign(connectionOptions, {
					host: configService.get(EEnvType.DATABASE_HOST) || connectionOptions['host'],
					port: configService.get(EEnvType.DATABASE_PORT) || connectionOptions['port'],
					username: configService.get(EEnvType.DATABASE_USER) || connectionOptions['username'],
					password: configService.get(EEnvType.DATABASE_PASSWORD) || connectionOptions['password'],
					database: configService.get(EEnvType.DATABASE) || connectionOptions.database,
					logging:
						(process.env.NODE_ENV && process.env.NODE_ENV === 'development') || connectionOptions.logging,
				});
			},
		}),
	],
})
export class MySQLModule {}
