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

  async getRecommendations(userId: string) {
    const preferences = await this.userPreferencesModel.findAll({
      where: { userId },
    });

    const hasSkinTypePreference = preferences.some(
      (p) => p.preferenceType === "skinType"
    );
    const hasHairTypePreference = preferences.some(
      (p) => p.preferenceType === "hairType"
    );
    console.log(preferences, "preferences");
    console.log(hasHairTypePreference, "hairType");
    console.log(hasSkinTypePreference, "skinType");

    const preferenceHandlers = {
      skinType: (value) => (hasSkinTypePreference ? { skinType: value } : {}),
      hairType: (value) => (hasHairTypePreference ? { hairType: value } : {}),
      ageGroup: (value) => ({ ageGroup: value }),
      brand: (value) => ({ brand: value }),
      productPurpose: (value) => ({ productPurpose: value }),
      season: (value) => ({ season: value }),
      skinConcern: (value) => ({ skinConcern: { [Op.like]: `%${value}%` } }),
      ingredients: (value) => ({ ingredients: { [Op.like]: `%${value}%` } }),
    };

    const filterOptions = preferences.reduce((acc, preference) => {
      const handler = preferenceHandlers[preference.preferenceType];
      if (handler) {
        const condition = handler(preference.preferenceValue);
        Object.assign(acc, condition);
      }
      return acc;
    }, {});

    return await this.productsModel.findAll({
      where: filterOptions,
    });
  }
}
