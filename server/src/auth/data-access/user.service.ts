import { IUser } from '@entities/entity-attribute/user.interface';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UserService {
	constructor(private readonly usersRepository: UsersRepository) {}

	getUserByEmail(email: string) {
		return this.usersRepository.getUserByEmail(email);
	}

	createUser(userAttr: IUser) {
		const user = this.usersRepository.create(userAttr);
		return this.usersRepository.save(user);
	}

	async updateById(id: number, data: Partial<IUser>) {
		return this.usersRepository.update(id, data);
	}

	getName(id: number) {
		return this.usersRepository.findOne(id, { select: ['name'] });
	}

	getInfo(id: number) {
		return this.usersRepository.findOne(id, { select: ['name', 'email', 'phoneNumber', 'role'] });
	}
}
