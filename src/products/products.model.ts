import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Categories } from "../categories/categories.model";
import { Recommendations } from "../recommendations/recommendations.model";

export enum SkinConcern {
  AcneAndBreakouts = "Акне и высыпания",
  WrinklesAndLines = "Морщины и линии",
  Pigmentation = "Пигментация",
  Sensitivity = "Чувствительность",
  Dryness = "Сухость",
  Dehydration = "Обезвоженность",
  Redness = "Краснота",
}

export enum AgeGroup {
  Teenager = "Подросток",
  Young = "Молодой(ая)",
  Mature = "Зрелый(ая)",
  PreSenior = "Предпожилой(ая)",
  Senior = "Пожилой(ая)",
}

export enum SkinType {
  Oily = "Жирная кожа",
  Dry = "Сухая кожа",
  Normal = "Нормальная кожа",
  Combination = "Комбинированная кожа",
}

export enum HairType {
  Oily = "Жирные волосы",
  Dry = "Сухие волосы",
  Normal = "Нормальные волосы",
}

export enum UsageTime {
  Morning = "Утреннее время",
  Evening = "Вечернее время",
}

export enum Ingredients {
  HyaluronicAcid = "Гиалуроновая кислота",
  Retinol = "Ретинол(Витамин А)",
  VitaminC = "Витамин C",
  VitaminB3 = "Витамин B3",
  Peptides = "Пептиды",
  Zinc = "Цинк",
  AloeVera = "Алоэ Вера",
  SPF = "SPF",
}

export enum EthicalPreferences {
  CrueltyFree = "Не тестируется на животных",
  Organic = "Органическая",
  EcoPackaging = "Экологичная упаковка",
  NoChemicals = "Отсутствие химикатов",
}

export enum ProductPurpose {
  Hydration = "Увлажнение",
  Nutrition = "Питание",
  Cleansing = "Очищение",
  Protection = "Защита",
  AcneTreatment = "Борьба с акне",
  Soothing = "Успокоение",
}

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

  @Column({ type: DataTypes.STRING, allowNull: false })
  productName: string;

  @Column({ type: DataTypes.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  imageURL: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  skinType: SkinType;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  hairType: HairType;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  ageGroup: AgeGroup;

  @Column({
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  })
  skinConcern: SkinConcern[];

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  usageTime: UsageTime;

  @Column({ type: DataTypes.STRING, allowNull: true })
  season: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  specialConditions: string;

  @Column({
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  })
  ingredients: Ingredients[];

  @Column({
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  })
  ethicalPreferences: EthicalPreferences[];

  @Column({
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  })
  purpose: string[];

  @Column({ type: DataTypes.STRING, allowNull: true })
  brand: string;

  @HasMany(() => Recommendations)
  recommendations: Recommendations[];

  @BelongsTo(() => Categories)
  category: Categories;
}
