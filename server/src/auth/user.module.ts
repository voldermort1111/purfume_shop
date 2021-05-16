import { UsersRepository } from './data-access/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './data-access/user.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UsersRepository])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
