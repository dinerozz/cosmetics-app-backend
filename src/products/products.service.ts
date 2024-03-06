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
