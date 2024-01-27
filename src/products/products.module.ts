import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Products } from "./products.model";
import { Recommendations } from "../recommendations/recommendations.model";
import { ProductsController } from "./products.controller";

@Module({
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Products, Recommendations])],
  controllers: [ProductsController],
})
export class ProductsModule {}
