import { Model } from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
interface UserCreationAttributes {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttributes> {
    id: string;
    email: string;
    password: string;
    banned: boolean;
    banReason: string;
    refreshToken: string;
    roles: Role[];
}
export {};
