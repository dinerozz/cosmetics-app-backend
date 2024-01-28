import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes, UUIDV4 } from "sequelize";
import { User } from "../users/users.model";

@Table({ tableName: "user_preferences" })
export class UserPreferences extends Model<UserPreferences> {
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID })
  userId: string;

  @Column({ type: DataTypes.STRING, unique: false })
  preferenceType: string;

  @Column({ type: DataTypes.STRING, unique: false })
  preferenceValue: string;

  @BelongsTo(() => User)
  users: User;
}
