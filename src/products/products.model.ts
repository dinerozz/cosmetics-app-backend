import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Recommendations } from "./recommendations.model";
import { Categories } from "../categories/categories.model";

@Table({ tableName: "products" })
export class Products extends Model<Products> {
  @Column({
    type: DataTypes.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Categories)
  @Column({ type: DataTypes.UUID, allowNull: false, unique: true })
  categoryId: string;

  @Column({ type: DataTypes.STRING, allowNull: true, unique: false })
  productName: string;

  @Column({ type: DataTypes.STRING, allowNull: true, unique: false })
  description: string;

  @Column({ type: DataTypes.STRING, allowNull: true, unique: false })
  imageURL: string;

  @HasMany(() => Recommendations)
  recommendations: Recommendations[];
}
