import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Products } from "./products.model";
import { CreateProductDto } from "./dto/products.dto";
import { Categories } from "../categories/categories.model";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products)
    private productsModel: typeof Products
  ) {}

  async create(createProductDto: CreateProductDto[]) {
    return this.productsModel.bulkCreate(createProductDto);
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
    return this.productsModel.update(product, { where: { id } });
  }

  async remove(id: string) {
    return this.productsModel.destroy({ where: { id } });
  }
}
