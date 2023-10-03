import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userRepository;
    private roleService;
    private jwtService;
    constructor(userRepository: typeof User, roleService: RolesService, jwtService: JwtService);
    createUser(dto: CreateUserDto): Promise<User>;
    getUserById(userId: any): Promise<User>;
    getCurrentUser(headers: Headers): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
    addRole(dto: AddRoleDto): Promise<AddRoleDto>;
    banUser(dto: BanUserDto): Promise<User>;
}
