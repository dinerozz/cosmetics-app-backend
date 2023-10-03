import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Role } from './roles.model';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Role)
  @Column({ type: DataTypes.UUID })
  roleId: string;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID })
  userId: string;
}
