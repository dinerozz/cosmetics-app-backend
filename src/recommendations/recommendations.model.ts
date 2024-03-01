import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "../users/users.model";
import { Products } from "../products/products.model";

@Table({ tableName: "recommendations", timestamps: true }) // Включение временных меток
export class Recommendations extends Model<Recommendations> {
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID, allowNull: false })
  userId: string;

  @ForeignKey(() => Products)
  @Column({ type: DataTypes.UUID, allowNull: false })
  productId: string;

  @Column({ type: DataTypes.TEXT, allowNull: false })
  reason: string;

  // Поле для рейтинга рекомендации пользователем
  @Column({ type: DataTypes.INTEGER, allowNull: true })
  rating: number;

  @BelongsTo(() => Products)
  product: Products;

  @BelongsTo(() => User)
  user: User;
}
