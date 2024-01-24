import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "./users.model";

@Table({ tableName: "user_preferences" })
export class UserPreferences extends Model<UserPreferences> {
  @Column({ type: DataTypes.UUID, primaryKey: true })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID, allowNull: false, unique: true })
  userId: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: false })
  preferenceType: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: false })
  preferenceValue: string;

  @BelongsTo(() => User)
  users: User;
}
