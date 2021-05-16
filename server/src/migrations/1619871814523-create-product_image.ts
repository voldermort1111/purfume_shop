import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProductImage1619871814523 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'product_image',
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
						name: 'productId',
						type: 'int',
						width: 11,
					},
					{
						name: 'value',
						type: 'varchar',
						length: '255',
					},
				],
				foreignKeys: [
					{
						name: 'product-product_image',
						columnNames: ['productId'],
						referencedTableName: 'product',
						referencedColumnNames: ['id'],
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.dropTable('product_image');
	}
}
