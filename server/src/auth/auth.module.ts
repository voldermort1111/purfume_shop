import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strargety';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EEnvType } from '../constants/env.type';
import { UserModule } from './user.module';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) =>
				({
					secret: configService.get(EEnvType.SECRET_JWT),
					signOptions: {
						expiresIn: '7d',
					},
				} as JwtModuleOptions),
			inject: [ConfigService],
		}),
		ConfigModule,
		UserModule,
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
