import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "../users/users.model";
import { Products } from "./products.model";

@Table({ tableName: "recommendations" })
export class Recommendations extends Model<Recommendations> {
  @Column({ type: DataTypes.UUID, primaryKey: true })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID, allowNull: false, unique: true })
  userId: string;

  @ForeignKey(() => Products)
  @Column({ type: DataTypes.UUID, allowNull: false, unique: false })
  productId: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: false })
  reason: string;

  @BelongsTo(() => Products)
  product: Products;

  @BelongsTo(() => User)
  user: User;
}
