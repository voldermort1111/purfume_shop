import { EAccountType } from './../constants/entity.constants';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EGuadDecoratorKey } from '../constants/guads.constant';

@Injectable()
export class RolesUserGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<boolean>(EGuadDecoratorKey.roleUserKey, [
			context.getHandler(),
			context.getClass(),
		]);
		if (requiredRoles === undefined) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return user?.type === EAccountType.USER;
	}
}
