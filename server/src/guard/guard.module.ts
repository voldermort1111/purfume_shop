import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesUserGuard } from './roles-user.guard';
import { RolesAdminGuard } from './roles-admin.guard';

@Module({
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		RolesUserGuard,
		RolesAdminGuard,
	],
})
export class GuardModule {}
