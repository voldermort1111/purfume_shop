import { ObjectLiteral } from 'typeorm';

export function cloneFilterObject(obj: ObjectLiteral, keys?: string[]): any {
	if (!obj) return null;
	const filterPaging = keys
		? (key, value) => {
				if (keys.includes(key)) return undefined;
				return value;
		  }
		: null;
	return JSON.parse(JSON.stringify(obj, filterPaging));
}
