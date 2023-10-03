import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto, response: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(userDto: CreateUserDto, response: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: any): Promise<any>;
}
