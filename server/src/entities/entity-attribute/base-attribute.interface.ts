export interface IBaseAttribute {
	id?: number;
}

export interface IBaseIncludeDateAttribute extends IBaseAttribute {
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}
