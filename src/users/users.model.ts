import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { DataTypes } from "sequelize";
import { UserPreferences } from "../user-preferences/user-preferences.model";
import { Recommendations } from "../recommendations/recommendations.model";
import { Notes } from "../notes/notes.model";

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: "1", description: "Unique identificator" })
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: "user@gmail.com", description: "Email address" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "12345678", description: "Password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "Aimira", description: "name" })
  @Column({ type: DataType.STRING, allowNull: true })
  fullName: string;

  @ApiProperty({
    example: "2021-08-31T14:00:00.000Z",
    description: "Date of birth",
  })
  @Column({ type: DataType.DATE, allowNull: true })
  dateOfBirth: Date;

  @ApiProperty({
    example: "http://example.com/myprofilepic.jpg",
    description: "Profile Image URL",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  profileImageUrl: string;

  @ApiProperty({ example: "true", description: "Is banned or not" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: "Foul", description: "Ban reason" })
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  banReason: string;

  @ApiProperty({ example: "Refresh token", description: "Refresh token" })
  @Column({ type: DataType.STRING, unique: true })
  refreshToken: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => UserPreferences)
  preferences: UserPreferences[];

  @HasMany(() => Recommendations)
  recommendations: Recommendations[];

  @HasMany(() => Notes)
  notes: Notes[];
}
