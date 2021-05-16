import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EAccountType, EUserRole } from './../constants/entity.constants';
import { EGuadDecoratorKey } from './../constants/guads.constant';

@Injectable()
export class RolesAdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<EUserRole[]>(EGuadDecoratorKey.roleAdminKey, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRoles) {
			return false;
		}
		const { user } = context.switchToHttp().getRequest();
		if (!requiredRoles.length) {
			return user?.type === EAccountType.ADMIN;
		}
		return requiredRoles.some(role => user.roles?.includes(role));
	}
}
