import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	InternalServerErrorException,
	// HttpException,
	// HttpStatus,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';

// function httpException(httpStatus: HttpStatus, message: string) {
// 	throw new HttpException(
// 		{
// 			status: httpStatus,
// 			message,
// 		},
// 		httpStatus,
// 	);
// }

// 400
export function httpBadRequest(message?: string) {
	throw new BadRequestException(message);
}

// 401
export function httpUnAuthorized(message?: string) {
	throw new UnauthorizedException(message);
}

// 403
export function httpForbidden(message?: string) {
	throw new ForbiddenException(message);
}

// 404
export function httpNotFound(message?: string) {
	throw new NotFoundException(message);
}

export function httpConflict(message?: string) {
	throw new ConflictException(message);
}

// 500
export function httpInternalServerErrorException() {
	throw new InternalServerErrorException();
}
