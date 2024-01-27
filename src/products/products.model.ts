import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Recommendations } from "../recommendations/recommendations.model";
import { Categories } from "../categories/categories.model";

@Table({ tableName: "products" })
export class Products extends Model<Products> {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Categories)
  @Column({ type: DataTypes.UUID, allowNull: false })
  categoryId: string;

  @Column({ type: DataTypes.STRING, allowNull: true, unique: false })
  productName: string;

  @Column({ type: DataTypes.STRING, allowNull: true, unique: false })
  description: string;

  @Column({ type: DataTypes.STRING, allowNull: true, unique: false })
  imageURL: string;

  @Column(DataTypes.STRING)
  skinType: string;

  @Column(DataTypes.STRING)
  hairType: string;

  @Column(DataTypes.STRING)
  specialConditions: string;

  @Column(DataTypes.STRING)
  purpose: string;

  @HasMany(() => Recommendations)
  recommendations: Recommendations[];
}
