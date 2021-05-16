import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProductEvaluate1619843610466 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'product_evaluate',
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
						name: 'userId',
						type: 'int',
						width: 11,
					},
					{
						name: 'productId',
						type: 'int',
						width: 11,
					},
					{
						name: 'point',
						type: 'tinyint',
						width: 1,
					},
					{
						name: 'comment',
						type: 'varchar',
						length: '1024',
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
				foreignKeys: [
					{
						name: 'product-product_evaluate',
						columnNames: ['productId'],
						referencedTableName: 'product',
						referencedColumnNames: ['id'],
					},
					{
						name: 'user-product_evaluate',
						columnNames: ['userId'],
						referencedTableName: 'user',
						referencedColumnNames: ['id'],
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.dropTable('product_evaluate');
	}
}
