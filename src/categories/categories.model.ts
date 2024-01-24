import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Products } from "../products/products.model";

@Table({ tableName: "categories" })
export class Categories extends Model<Categories> {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataTypes.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataTypes.STRING, unique: false, allowNull: false })
  description: string;

  @HasMany(() => Products)
  products: Products[];
}
