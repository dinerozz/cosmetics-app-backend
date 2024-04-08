import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "../users/users.model";

@Table({ tableName: "notes" })
export class Notes extends Model<Notes> {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
  })
  userId: string;

  @Column({ type: DataTypes.STRING, unique: false, allowNull: false })
  title: string;

  @Column({ type: DataTypes.TEXT, unique: false, allowNull: false })
  description: string;
}
