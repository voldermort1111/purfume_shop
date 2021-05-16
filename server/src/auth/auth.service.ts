import { IJwtPayload } from './data-access/interfaces/auth.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { EEnvType } from './../constants/env.type';
import { UserService } from './data-access/user.service';
import { LoginDto, LoginResponseDto, RegisterDto } from './data-access/dto/auth.dto';
import { httpBadRequest, httpNotFound, httpUnAuthorized } from './../shared/exceptions/http-exception';
import { EAccountType, EUserRole } from './../constants/entity.constants';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {}

	async refreshJwtToken(refreshToken: string) {
		try {
			const jwtData = this.jwtService.verify(refreshToken, {
				secret: this.configService.get(EEnvType.REFRESH_TOKEN_SECRET_JWT),
				ignoreExpiration: true,
			}) as IJwtPayload;
			const { userId, type, roles } = jwtData as IJwtPayload;
			return this.jwtService.sign({ userId, type, roles } as IJwtPayload);
		} catch (error) {
			httpBadRequest('Token had time out expiration!');
		}
	}

	private async getLoginData(userId: number, type: EAccountType, role: string) {
		const payload = { userId, type, roles: [role] };
		const accessToken = this.jwtService.sign(payload);
		const refreshToken = this.getRefreshToken(payload);
		return {
			accessToken,
			refreshToken,
		};
	}

	private getRefreshToken(payload: IJwtPayload) {
		const refreshSecretKey = this.configService.get<string>(EEnvType.REFRESH_TOKEN_SECRET_JWT);
		return this.jwtService.sign(payload, {
			secret: refreshSecretKey,
			expiresIn: '7d',
		});
	}

	async login(loginDto: LoginDto): Promise<LoginResponseDto> {
		const user = await this.userService.getUserByEmail(loginDto.email);
		if (!user) {
			httpUnAuthorized('Tên đăng nhập hoặc mật khẩu không chính xác!');
		}
		if (!this.isPasswordCorrect(user.password, loginDto.password, user.salt, user.iterations)) {
			httpUnAuthorized(`Tên đăng nhập hoặc mật khẩu không chính xác!`);
		}
		return this.getLoginData(
			user.id,
			user.role === EUserRole.user ? EAccountType.USER : EAccountType.ADMIN,
			user.role,
		);
	}

	async adminLogin(loginDto: LoginDto) {
		const user = await this.userService.getUserByEmail(loginDto.email);
		if (user.role === EUserRole.user) {
			httpUnAuthorized('Tên đăng nhập hoặc mật khẩu không chính xác!');
		}
		if (!this.isPasswordCorrect(user.password, loginDto.password, user.salt, user.iterations)) {
			httpUnAuthorized(`Tên đăng nhập hoặc mật khẩu không chính xác!`);
		}
		return this.getLoginData(
			user.id,
			user.role === EUserRole.user ? EAccountType.USER : EAccountType.ADMIN,
			user.role,
		);
	}

	async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
		let user = await this.userService.getUserByEmail(registerDto.email);
		if (user) {
			httpBadRequest(`Email đã được dùng!`);
		}
		const { salt, iterations, password } = this.hashPassword(registerDto.password);
		registerDto.email, password, salt, iterations;
		user = await this.userService.createUser({
			email: registerDto.email,
			password,
			salt,
			iterations,
			name: registerDto.name,
			phoneNumber: registerDto.phoneNumber,
		});
		return this.getLoginData(
			user.id,
			user.role === EUserRole.user ? EAccountType.USER : EAccountType.ADMIN,
			user.role,
		);
	}

	async createAccount(registerDto: RegisterDto) {
		let user = await this.userService.getUserByEmail(registerDto.email);
		if (user) {
			httpBadRequest(`Email đã được dùng!`);
		}
		const { salt, iterations, password } = this.hashPassword(registerDto.password);
		registerDto.email, password, salt, iterations;
		return this.userService.createUser({
			email: registerDto.email,
			password,
			role: EUserRole.subAdmin,
			salt,
			iterations,
			name: registerDto.name,
			phoneNumber: registerDto.phoneNumber,
		});
	}

	changePassword(id: number, password: string) {
		const hashPassword = this.hashPassword(password);
		return this.userService.updateById(id, { ...hashPassword });
	}

	async forgotPassword(email: string) {
		console.log(email);
	}

	private hashPassword(password: string) {
		const salt = crypto.randomBytes(128).toString('base64');
		const iterations = this.randomIterations();
		const hash = this.hashString(password, salt, iterations);
		return { salt, password: hash, iterations };
	}

	private randomIterations(): number {
		const value = Math.floor(Math.random() * 10000);
		return value >= 3000 && value <= 6000 ? value : this.randomIterations();
	}

	private isPasswordCorrect(savedHash: string, password: string, salt: string, iterations: number): boolean {
		return savedHash == this.hashString(password, salt, iterations);
	}

	private hashString(password: string, salt: string, iterations: number): string {
		return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
	}
}
