import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
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
  @Column({ type: DataTypes.UUID, allowNull: false })
  userId: string;

  @Column({
    type: DataTypes.ENUM,
    values: [
      "skinType",
      "hairType",
      "ageGroup",
      "skinConcern",
      "usageTime",
      "season",
      "productPurpose",
      "specialConditions",
      "ingredients",
      "ethicalPreferences",
      "brand",
      "other",
    ],
    allowNull: false,
  })
  preferenceType: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  preferenceValue: string;

  @BelongsTo(() => User)
  user: User;
}
