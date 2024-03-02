import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "../users/users.model";

export enum Preferences {
  SkinType = "skinType",
  HairType = "hairType",
  AgeGroup = "ageGroup",
  SkinConcern = "skinConcern",
  UsageTime = "usageTime",
  Season = "season",
  ProductPurpose = "productPurpose",
  SpecialConditions = "specialConditions",
  Ingredients = "ingredients",
  EthicalPreferences = "ethicalPreferences",
  Brand = "brand",
  Other = "other",
}

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
    values: Object.values(Preferences),
    allowNull: false,
  })
  preferenceType: string;

  @Column({ type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false })
  preferenceValue: string[];

  @BelongsTo(() => User)
  user: User;
}
