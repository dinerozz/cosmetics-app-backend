import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Products } from "./products.model";
import { Recommendations } from "../recommendations/recommendations.model";
import { ProductsController } from "./products.controller";
import { Categories } from "../categories/categories.model";

@Module({
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Products, Categories, Recommendations]),
  ],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
