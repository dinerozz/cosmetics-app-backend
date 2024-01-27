import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserPreferences } from "../user-preferences/user-preferences.model";
import { Products } from "../products/products.model";
import { Recommendations } from "./recommendations.model";
import { Op } from "sequelize";

const preferences = [
  { preferenceType: "skinType", preferenceValue: "жирная" },
  { preferenceType: "hairType", preferenceValue: "сухие" },
];

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

  async generateRecommendations(userId: string) {
    const userPreferences = await this.userPreferencesModel.findAll({
      where: { userId },
    });

    const recommendations = [];
    let filteredProducts = [];

    let orConditions = preferences.map((pref) => {
      return { [pref.preferenceType]: pref.preferenceValue };
    });

    for (const preference of userPreferences) {
      const products = await this.productsModel.findAll({
        where: {
          [Op.or]: orConditions,
        },
      });

      filteredProducts = [...new Set([...filteredProducts, ...products])];

      for (const product of filteredProducts) {
        const recommendation = new Recommendations();
        recommendation.userId = userId;
        recommendation.productId = product.id;
        recommendation.reason = `Подходит на основе предпочтения: ${preference.preferenceType}`;
        recommendations.push(recommendation);
      }
    }

    return filteredProducts;
  }
}
