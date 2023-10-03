import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { DataTypes, Sequelize } from 'sequelize';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Is banned or not' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'Foul', description: 'Ban reason' })
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  banReason: string;

  @ApiProperty({ example: 'Refresh token', description: 'Refresh token' })
  @Column({ type: DataType.STRING, unique: true })
  refreshToken: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
