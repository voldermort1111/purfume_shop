import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOrderProduct1619865412661 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'order_product',
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
						name: 'orderId',
						type: 'int',
						width: 11,
					},
					{
						name: 'productId',
						type: 'int',
						width: 11,
					},
					{
						name: 'unitPrice',
						type: 'int',
						width: 11,
					},
					{
						name: 'quantity',
						type: 'int',
						width: 11,
					},
				],
				foreignKeys: [
					{
						name: 'product-order_product',
						columnNames: ['productId'],
						referencedTableName: 'product',
						referencedColumnNames: ['id'],
					},
					{
						name: 'order-order_product',
						columnNames: ['orderId'],
						referencedTableName: 'order',
						referencedColumnNames: ['id'],
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.dropTable('order_product');
	}
}
