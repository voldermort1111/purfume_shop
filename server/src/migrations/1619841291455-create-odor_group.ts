import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOdorGroup1619841291455 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'odor_group',
				columns: [
					{
						name: 'id',
						type: 'int',
						width: 11,
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar',
						length: '50',
					},
					{
						name: 'value',
						type: 'varchar',
						length: '50',
					},
					{
						name: 'deletedAt',
						type: 'datetime',
						isNullable: true,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.dropTable('odor_group');
	}
}
