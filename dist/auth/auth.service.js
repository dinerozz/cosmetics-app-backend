"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(userDto, response) {
        const user = await this.validateUser(userDto);
        const tokens = await this.generateTokens(user);
        response.cookie('jwt', tokens.accessToken, {
            httpOnly: true,
            domain: 'http://localhost:5173',
        });
        return tokens;
    }
    async register(userDto, response) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException('User with given email address already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser(Object.assign(Object.assign({}, userDto), { password: hashedPassword }));
        const tokens = await this.generateTokens(user);
        response.cookie('jwt', tokens.accessToken, {
            httpOnly: true,
            domain: 'http://localhost:5173',
        });
        return tokens;
    }
    async logout() {
        return undefined;
    }
    async generateTokens(user) {
        const accessTokenPayload = {
            email: user.email,
            id: user.id,
            roles: user.roles,
        };
        const refreshTokenPayload = { sub: user.id, jti: (0, uuid_1.v4)() };
        const accessToken = this.jwtService.sign(accessTokenPayload, {
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(refreshTokenPayload, {
            expiresIn: '7d',
        });
        user.refreshToken = refreshToken;
        await user.save();
        return { accessToken, refreshToken };
    }
    async validateUser(userDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordsEqual = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordsEqual) {
            return user;
        }
        throw new common_1.UnauthorizedException({
            message: 'Invalid credentials, check your email or password',
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map