import { BaseRepository } from '../../core/base-repository';
import { User } from '../../entities/user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UsersRepository extends BaseRepository<User> {
	getUserByEmail(email: string) {
		return this.findOne({ email });
	}
}
