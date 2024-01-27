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
        recommendations.push({
          userId,
          productId: product.id,
          reason: `Подходит на основе предпочтения: ${preference.preferenceType}`,
        });
      }
    }
    console.log("recommendations", recommendations);
    await this.recommendationsModel.bulkCreate(recommendations);
    return filteredProducts;
  }
}
