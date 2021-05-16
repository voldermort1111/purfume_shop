import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class createNational1619945245039 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'national',
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
						name: 'deletedAt',
						type: 'datetime',
						isNullable: true,
					},
				],
			}),
		);
		await queryRunner.dropColumn('provider', 'national');
		await queryRunner.addColumn(
			'provider',
			new TableColumn({
				name: 'nationalId',
				type: 'int',
				width: 11,
				isNullable: true,
			}),
		);
		await queryRunner.createForeignKey(
			'provider',
			new TableForeignKey({
				name: 'national-provider',
				columnNames: ['nationalId'],
				referencedTableName: 'national',
				referencedColumnNames: ['id'],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('provider', 'national-provider');
		await queryRunner.dropColumn('provider', 'nationalId');
		return queryRunner.dropTable('national');
	}
}
