import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {
  AgeGroup,
  EthicalPreferences,
  HairType,
  Ingredients,
  ProductPurpose,
  Products,
  SkinConcern,
  SkinType,
  UsageTime,
} from "./products.model";
import { CreateProductDto } from "./dto/products.dto";
import { Categories } from "../categories/categories.model";
import { UpdateProductDto } from "./dto/update-product.dto";

export const productsData: CreateProductDto[] = [
  {
    categoryId: "dcacb145-008e-4363-9aa2-7cba37cf7427",
    productName: "Интенсивный увлажняющий крем для лица",
    description:
      "Глубоко увлажняет и восстанавливает кожу, предотвращает появление морщин.",
    imageURL: "/images/moisturizer.jpg",
    skinType: SkinType.Dry,
    ageGroup: AgeGroup.Young,
    skinConcern: [SkinConcern.Dryness],
    usageTime: UsageTime.Morning,
    ingredients: [Ingredients.HyaluronicAcid, Ingredients.VitaminC],
    ethicalPreferences: [
      EthicalPreferences.CrueltyFree,
      EthicalPreferences.Organic,
    ],
    purpose: ProductPurpose.Hydration,
    brand: "HydraGenius",
  },
  {
    categoryId: "52fbdd32-64d9-4321-8226-73a6489ae346",
    productName: "Восстанавливающий шампунь для волос",
    description:
      "Укрепляет корни волос и способствует их росту, предотвращает выпадение волос.",
    imageURL: "/images/shampoo.jpg",
    hairType: HairType.Dry,
    ageGroup: AgeGroup.Mature,
    usageTime: UsageTime.Evening,
    ingredients: [Ingredients.Peptides, Ingredients.VitaminB3],
    ethicalPreferences: [EthicalPreferences.EcoPackaging],
    purpose: ProductPurpose.Nutrition,
    brand: "StrengthHair",
  },
  {
    categoryId: "a024b490-5b07-4e7c-b96e-d77ad375c192",
    productName: "Солнцезащитный крем SPF 50",
    description:
      "Обеспечивает высокую защиту от UVA и UVB лучей, подходит для чувствительной кожи.",
    imageURL: "/images/sunscreen.jpg",
    skinType: SkinType.Normal,
    ageGroup: AgeGroup.Senior,
    skinConcern: [SkinConcern.Sensitivity],
    usageTime: UsageTime.Morning,
    ingredients: [Ingredients.SPF],
    ethicalPreferences: [
      EthicalPreferences.NoChemicals,
      EthicalPreferences.CrueltyFree,
    ],
    purpose: ProductPurpose.Protection,
    brand: "SunBlocker",
  },
];

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products)
    private productsModel: typeof Products
  ) {}

  async addProduct(productData: CreateProductDto): Promise<Products> {
    const [product, created] = await this.productsModel.findOrCreate({
      where: { productName: productData.productName },
      defaults: {
        ...productData,
      },
      logging: console.log,
    });

    if (created) {
      console.log(`Категория ${productData.productName} успешно добавлена.`);
    } else {
      console.log(`Категория ${productData.productName} уже существует.`);
    }

    return product;
  }

  async fillProducts(products: CreateProductDto[]) {
    for (const productData of products) {
      await this.addProduct(productData);
    }
    console.log("Продукты успешно добавлены.");
  }

  async create(createProductDto: CreateProductDto[]) {
    // return this.productsModel.bulkCreate(createProductDto);
  }

  async findAll() {
    return this.productsModel.findAll();
  }

  async findOne(id: string) {
    return this.productsModel.findByPk(id, {
      include: [{ model: Categories }],
    });
  }

  async update(id: string, product: UpdateProductDto) {
    // return this.productsModel.update(product, { where: { id } });
  }

  async remove(id: string) {
    return this.productsModel.destroy({ where: { id } });
  }
}
