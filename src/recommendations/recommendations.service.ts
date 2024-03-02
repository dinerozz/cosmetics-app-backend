import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {
  Preferences,
  UserPreferences,
} from "../user-preferences/user-preferences.model";
import {
  AgeGroup,
  HairType,
  Ingredients,
  ProductPurpose,
  Products,
  SkinConcern,
  SkinType,
} from "../products/products.model";
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

    const preferenceFlags = preferences.reduce(
      (acc, p) => {
        acc.hasSkinTypePreference =
          acc.hasSkinTypePreference ||
          p.preferenceType === Preferences.SkinType;
        acc.hasHairTypePreference =
          acc.hasHairTypePreference ||
          p.preferenceType === Preferences.HairType;
        acc.hasAgeGroupPreference =
          acc.hasAgeGroupPreference ||
          p.preferenceType === Preferences.AgeGroup;
        acc.hasSkinConcernPreference =
          acc.hasSkinConcernPreference ||
          p.preferenceType === Preferences.SkinConcern;
        acc.hasUsageTimePreference =
          acc.hasUsageTimePreference ||
          p.preferenceType === Preferences.UsageTime;
        acc.hasProductPurposePreference =
          acc.hasProductPurposePreference ||
          p.preferenceType === Preferences.ProductPurpose;
        acc.hasBrandPreference =
          acc.hasBrandPreference || p.preferenceType === Preferences.Brand;
        acc.hasSeasonPreference =
          acc.hasSeasonPreference || p.preferenceType === Preferences.Season;
        acc.hasIngredientsPreference =
          acc.hasIngredientsPreference ||
          p.preferenceType === Preferences.Ingredients;
        return acc;
      },
      {
        hasSkinTypePreference: false,
        hasHairTypePreference: false,
        hasAgeGroupPreference: false,
        hasSkinConcernPreference: false,
        hasUsageTimePreference: false,
        hasProductPurposePreference: false,
        hasBrandPreference: false,
        hasSeasonPreference: false,
        hasIngredientsPreference: false,
      }
    );

    const {
      hasSkinTypePreference,
      hasHairTypePreference,
      hasAgeGroupPreference,
      hasSkinConcernPreference,
      hasUsageTimePreference,
      hasProductPurposePreference,
      hasBrandPreference,
      hasSeasonPreference,
      hasIngredientsPreference,
    } = preferenceFlags;

    console.log(preferenceFlags, "flags");

    type TPreferenceHandlers = {
      skinType: (value: string[]) => { skinType: SkinType[] } | {};
      hairType: (value: string[]) => { skinType: HairType[] } | {};
      ageGroup: (value: string[]) => { ageGroup: AgeGroup[] } | {};
      brand: (value: string[]) => { brand: string[] } | {};
      productPurpose: (
        value: string[]
      ) => { productPurpose: ProductPurpose[] } | {};
      season: (value: string[]) => { season: string[] } | {};
      skinConcern: (value: string[]) => { skinConcern: SkinConcern[] } | {};
      ingredients: (value: string[]) => { ingredients: Ingredients[] } | {};
    };

    const preferenceHandlers: TPreferenceHandlers = {
      skinType: (value) => (hasSkinTypePreference ? { skinType: value } : {}),
      hairType: (value) => (hasHairTypePreference ? { hairType: value } : {}),
      ageGroup: (value) => (hasAgeGroupPreference ? { ageGroup: value } : {}),
      brand: (value) => (hasBrandPreference ? { brand: value } : {}),
      productPurpose: (value) =>
        hasProductPurposePreference ? { productPurpose: value } : {},
      season: (value) => (hasSeasonPreference ? { season: value } : {}),
      skinConcern: (value) =>
        hasSkinConcernPreference
          ? { skinConcern: { [Op.contains]: value } }
          : {},
      ingredients: (value) =>
        hasIngredientsPreference
          ? { ingredients: { [Op.contains]: value } }
          : {},
    };

    const filterConditions = [];

    Object.entries(preferenceHandlers).forEach(([preferenceType, handler]) => {
      const preference = preferences.find(
        (p) => p.preferenceType === preferenceType
      );
      if (preference) {
        const condition = handler(preference.preferenceValue);
        if (Object.keys(condition).length > 0) {
          filterConditions.push(condition);
        }
      }
    });

    return await this.productsModel.findAll({
      where: { [Op.or]: filterConditions },
      logging: console.log,
    });

    // const filterOptions = preferences.reduce((acc, preference) => {
    //   const handler = preferenceHandlers[preference.preferenceType];
    //   if (handler) {
    //     const condition = handler(preference.preferenceValue);
    //     Object.assign(acc, condition);
    //   }
    //   return acc;
    // }, {});
    // console.log(filterOptions, "filter options");
    // return await this.productsModel.findAll({
    //   where: { [Op.or]: filterOptions },
    //   logging: console.log,
    // });
  }
}
