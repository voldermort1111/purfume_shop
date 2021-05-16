import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProvider1619836502889 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'provider',
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
						name: 'code',
						type: 'varchar',
						length: '50',
						isNullable: true,
					},
					{
						name: 'national',
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
		return queryRunner.dropTable('provider');
	}
}
