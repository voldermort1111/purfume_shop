import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProduct1619841492035 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'product',
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
						length: '255',
					},
					{
						name: 'code',
						type: 'varchar',
						length: '50',
						isUnique: true,
					},
					{
						name: 'status',
						type: 'enum',
						enum: ['ACTIVE', 'STOP_SELLING'],
						default: "'ACTIVE'",
					},
					{
						name: 'quantity',
						type: 'int',
						width: 11,
						default: 0,
					},
					{
						name: 'gender',
						type: 'enum',
						enum: ['Male', 'Female', 'All'],
					},
					{
						name: 'price',
						type: 'int',
						width: 11,
					},
					{
						name: 'originPrice',
						type: 'int',
						width: 11,
					},
					{
						name: 'avatar',
						type: 'varchar',
						length: '255',
						isNullable: true,
					},
					{
						name: 'providerId',
						type: 'int',
						width: 11,
					},
					{
						name: 'capacityId',
						type: 'int',
						width: 11,
					},
					{
						name: 'styleId',
						type: 'int',
						width: 11,
					},
					{
						name: 'odorRetentionTimeId',
						type: 'int',
						width: 11,
					},
					{
						name: 'odorGroupId',
						type: 'int',
						width: 11,
					},
					{
						name: 'odorRangeId',
						type: 'int',
						width: 11,
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
						name: 'provider-product',
						columnNames: ['providerId'],
						referencedTableName: 'provider',
						referencedColumnNames: ['id'],
					},
					{
						name: 'capacity-product',
						columnNames: ['capacityId'],
						referencedTableName: 'capacity',
						referencedColumnNames: ['id'],
					},
					{
						name: 'style-product',
						columnNames: ['styleId'],
						referencedTableName: 'style',
						referencedColumnNames: ['id'],
					},
					{
						name: 'odor_retention_time-product',
						columnNames: ['odorRetentionTimeId'],
						referencedTableName: 'odor_retention_time',
						referencedColumnNames: ['id'],
					},
					{
						name: 'odor_group-product',
						columnNames: ['odorGroupId'],
						referencedTableName: 'odor_group',
						referencedColumnNames: ['id'],
					},
					{
						name: 'odor_range-product',
						columnNames: ['odorRangeId'],
						referencedTableName: 'odor_range',
						referencedColumnNames: ['id'],
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.dropTable('product');
	}
}
