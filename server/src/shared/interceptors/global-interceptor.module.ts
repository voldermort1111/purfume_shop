import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
	providers: [
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: PlainToClassTransformInterceptor,
		// },
	],
})
export class GlobalInterceptorModule {}
