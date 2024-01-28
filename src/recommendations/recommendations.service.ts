import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserPreferences } from "../user-preferences/user-preferences.model";
import { Products } from "../products/products.model";
import { Recommendations } from "./recommendations.model";
import { Op } from "sequelize";

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel(UserPreferences)
    private userPreferencesModel: typeof UserPreferences,
    @InjectModel(Products)
    private productsModel: typeof Products,
    @InjectModel(Recommendations)
    private recommendationsModel: typeof Recommendations
  ) {}

  async generateRecommendations(userId) {
    const userPreferences = await this.userPreferencesModel.findAll({
      where: { userId },
    });

    let orConditions = userPreferences.map((pref) => {
      return { [pref.preferenceType]: pref.preferenceValue };
    });

    const products = await this.productsModel.findAll({
      where: {
        [Op.or]: orConditions,
      },
    });

    const recommendations = products.map((product) => ({
      userId,
      productId: product.id,
      reason: `Подходит на основе предпочтений пользователя`,
    }));

    await this.recommendationsModel.bulkCreate(recommendations);

    return products;
  }
}
