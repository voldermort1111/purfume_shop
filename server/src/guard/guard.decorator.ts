import { SetMetadata } from '@nestjs/common';
import { EUserRole } from './../constants/entity.constants';
import { EGuadDecoratorKey } from '../constants/guads.constant';

export const GuardPublic = () => SetMetadata(EGuadDecoratorKey.isPublicKey, true);
export const RolesAdmin = (...roles: EUserRole[]) => SetMetadata(EGuadDecoratorKey.roleAdminKey, roles);
export const RolesUser = () => SetMetadata(EGuadDecoratorKey.roleUserKey, true);
