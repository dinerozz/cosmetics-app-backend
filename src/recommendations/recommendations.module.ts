import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Recommendations } from "./recommendations.model";
import { RecommendationsService } from "./recommendations.service";
import { User } from "../users/users.model";
import { RecommendationsController } from "./recommendations.controller";
import { Products } from "../products/products.model";
import { UserPreferences } from "../user-preferences/user-preferences.model";

@Module({
  providers: [RecommendationsService],
  imports: [
    SequelizeModule.forFeature([
      Recommendations,
      Products,
      User,
      UserPreferences,
    ]),
  ],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}
