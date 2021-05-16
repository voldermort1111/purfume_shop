export enum EPageDirection {
	ASC = 'ASC',
	DESC = 'DESC',
}

export interface IOptionsPaging {
	limit?: number;
	page?: number;
	sortBy?: string;
	direction?: EPageDirection;
}
