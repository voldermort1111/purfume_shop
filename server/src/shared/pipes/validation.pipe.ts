import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

function toValidate(metatype: Function): boolean {
	const types: Function[] = [String, Boolean, Number, Array, Object];
	return !types.includes(metatype);
}

@Injectable()
export class ValidationBodyPipe implements PipeTransform<any> {
	async transform(value: any, { metatype, type }: ArgumentMetadata) {
		if (type !== 'body') {
			return value;
		}
		if (!metatype || !toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			throw new BadRequestException(errors[0].constraints[Object.keys(errors[0].constraints)[0]]);
		}
		return object;
	}
}

@Injectable()
export class ValidationQueryPipe implements PipeTransform<any> {
	async transform(value: any, { metatype, type }: ArgumentMetadata) {
		if (type !== 'query' && type !== 'param') {
			return value;
		}
		if (!metatype || !toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			throw new BadRequestException(errors[0].constraints[Object.keys(errors[0].constraints)[0]]);
		}
		return value;
	}
}
