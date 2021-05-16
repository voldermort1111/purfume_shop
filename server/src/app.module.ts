import { WorkerModule } from 'workers/worker.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomConfigModule } from './config/config.module';
import { MySQLModule } from './database/mysql.module';
import { MODULES } from './features';
import { GuardModule } from './guard/guard.module';
// import { GlobalInterceptorModule } from './shared/interceptors/global-interceptor.module';
import { LoggerHttpRequestMiddleware } from './shared/middleware/logger-http-request.middleware';
import { PipeModule } from './shared/pipes/pipe.module';
import { UserModule } from '@auth/user.module';

@Module({
	imports: [
		CustomConfigModule,
		MySQLModule,
		AuthModule,
		UserModule,
		PipeModule,
		GuardModule,
		// GlobalInterceptorModule,
		WorkerModule,
		...MODULES,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		if (process.env.NODE_ENV === 'development') {
			consumer.apply(LoggerHttpRequestMiddleware).forRoutes('*');
		}
	}
}
