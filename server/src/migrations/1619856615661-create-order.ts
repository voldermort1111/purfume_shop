import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOrder1619856615661 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'order',
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
						isNullable: true,
					},
					{
						name: 'price',
						type: 'int',
						width: 11,
					},
					{
						name: 'status',
						type: 'enum',
						enum: ['PENDING', 'DELIVERY', 'COMPLETED', 'CENCELED'],
						default: "'PENDING'",
					},
					{
						name: 'receiver',
						type: 'varchar',
						length: '50',
					},
					{
						name: 'phoneNumber',
						type: 'varchar',
						length: '15',
					},
					{
						name: 'address',
						type: 'varchar',
						length: '255',
					},
					{
						name: 'note',
						type: 'varchar',
						length: '1024',
						isNullable: true,
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
				foreignKeys: [
					{
						name: 'order-user',
						columnNames: ['userId'],
						referencedTableName: 'user',
						referencedColumnNames: ['id'],
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.dropTable('order');
	}
}
