import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Categories } from "./categories.model";
import { CategoriesController } from './categories.controller';

@Module({
  providers: [CategoriesService],
  imports: [SequelizeModule.forFeature([Categories])],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
