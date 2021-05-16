import { ValidationBodyPipe } from './validation.pipe';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationBodyPipe,
		},
	],
})
export class PipeModule {}
