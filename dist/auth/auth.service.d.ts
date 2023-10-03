import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto, response: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(userDto: CreateUserDto, response: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(): Promise<any>;
    private generateTokens;
    private validateUser;
}
