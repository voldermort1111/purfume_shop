import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCapacity1619840736672 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'capacity',
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
						name: 'value',
						type: 'int',
						width: 11,
					},
					{
						name: 'unit',
						type: 'enum',
						enum: ['ml', 'l'],
						default: "'ml'",
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
		return queryRunner.dropTable('capacity');
	}
}
