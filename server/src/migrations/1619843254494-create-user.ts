import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1619843254494 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
						width: 11,
					},
					{
						name: 'name',
						type: 'varchar',
						length: '50',
					},
					{
						name: 'email',
						type: 'varchar',
						length: '255',
						isUnique: true,
					},
					{
						name: 'password',
						type: 'varchar',
						length: '255',
					},
					{
						name: 'phoneNumber',
						type: 'varchar',
						length: '15',
						isNullable: true,
					},
					{
						name: 'role',
						type: 'enum',
						enum: ['USER', 'ADMIN'],
						default: "'USER'",
					},
					{
						name: 'salt',
						type: 'varchar',
						length: '255',
					},
					{
						name: 'iterations',
						type: 'int',
						width: 11,
					},
					{
						name: 'isNew',
						type: 'boolean',
						default: 0,
					},
					{
						name: 'deletedAt',
						type: 'datetime',
						isNullable: true,
					},
					{
						name: 'createdAt',
						type: 'datetime',
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updatedAt',
						type: 'datetime',
						default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
					},
				],
			}),
		);
		await queryRunner.query(
			"INSERT INTO `user` (`name`, `email`, `password`, `phoneNumber`, `role`, `salt`, `iterations`, `isNew`) VALUES ('Nguyễn Danh Khánh', 'admin@gmail.com', '51f92942e80c82b48f533dc01597f73acc5561a093f6a5432a5c06b6006763087df9890faf2ea6680e051006064ead3fa3d8a7c65f28ef4013350a9d9d360490', '0123123123', 'ADMIN', 'SudQvYUAp6TbF92plBse2zlDi+UPfrH5ARIVDbDrz1z+sa/2Ssak/Iu3YSAgzvUa5wrzYnpEmpD62ZaczYXr+PiHdrqXd0i8uARl1hlCkUfVmCxlJMeFolei9fLG5S+BcaT3fytCQFarLxCQFYQ1p9HTb145iFeCtZLAr2crn7w=', '3197', '0')",
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.dropTable('user');
	}
}
