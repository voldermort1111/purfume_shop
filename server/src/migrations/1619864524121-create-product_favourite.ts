import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProductFavourite1619864524121 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'product_favourite',
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
				],
				foreignKeys: [
					{
						name: 'product-product_favourite',
						columnNames: ['productId'],
						referencedTableName: 'product',
						referencedColumnNames: ['id'],
					},
					{
						name: 'user-product_favourite',
						columnNames: ['userId'],
						referencedTableName: 'user',
						referencedColumnNames: ['id'],
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.dropTable('product_favourite');
	}
}
