import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Categories } from "./categories.model";
import { CategoriesController } from "./categories.controller";
import { Products } from "../products/products.model";

@Module({
  providers: [CategoriesService],
  imports: [SequelizeModule.forFeature([Categories, Products])],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
