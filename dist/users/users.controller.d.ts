import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUserDto): Promise<User>;
    getUserById(userId: string): Promise<User>;
    getCurrentUser(headers: any): Promise<User>;
    getAll(): Promise<User[]>;
    addRole(dto: AddRoleDto): Promise<AddRoleDto>;
    ban(dto: BanUserDto): Promise<User>;
}
