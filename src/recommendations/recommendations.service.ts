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

  // async getRecommendations(userId: string) {
  //   const preferences = await this.userPreferencesModel.findAll({
  //     where: { userId },
  //   });
  //
  //   const preferenceFlags = preferences.reduce(
  //     (acc, p) => {
  //       acc.hasSkinTypePreference =
  //         acc.hasSkinTypePreference ||
  //         p.preferenceType === Preferences.SkinType;
  //       acc.hasHairTypePreference =
  //         acc.hasHairTypePreference ||
  //         p.preferenceType === Preferences.HairType;
  //       acc.hasAgeGroupPreference =
  //         acc.hasAgeGroupPreference ||
  //         p.preferenceType === Preferences.AgeGroup;
  //       acc.hasSkinConcernPreference =
  //         acc.hasSkinConcernPreference ||
  //         p.preferenceType === Preferences.SkinConcern;
  //       acc.hasUsageTimePreference =
  //         acc.hasUsageTimePreference ||
  //         p.preferenceType === Preferences.UsageTime;
  //       acc.hasProductPurposePreference =
  //         acc.hasProductPurposePreference ||
  //         p.preferenceType === Preferences.ProductPurpose;
  //       acc.hasBrandPreference =
  //         acc.hasBrandPreference || p.preferenceType === Preferences.Brand;
  //       acc.hasSeasonPreference =
  //         acc.hasSeasonPreference || p.preferenceType === Preferences.Season;
  //       acc.hasIngredientsPreference =
  //         acc.hasIngredientsPreference ||
  //         p.preferenceType === Preferences.Ingredients;
  //       return acc;
  //     },
  //     {
  //       hasSkinTypePreference: false,
  //       hasHairTypePreference: false,
  //       hasAgeGroupPreference: false,
  //       hasSkinConcernPreference: false,
  //       hasUsageTimePreference: false,
  //       hasProductPurposePreference: false,
  //       hasBrandPreference: false,
  //       hasSeasonPreference: false,
  //       hasIngredientsPreference: false,
  //     }
  //   );
  //
  //   const {
  //     hasSkinTypePreference,
  //     hasHairTypePreference,
  //     hasAgeGroupPreference,
  //     hasSkinConcernPreference,
  //     hasUsageTimePreference,
  //     hasProductPurposePreference,
  //     hasBrandPreference,
  //     hasSeasonPreference,
  //     hasIngredientsPreference,
  //   } = preferenceFlags;
  //
  //   console.log(preferenceFlags, "flags");
  //
  //   type TPreferenceHandlers = {
  //     skinType: (value: string[]) => { skinType: SkinType[] } | {};
  //     hairType: (value: string[]) => { skinType: HairType[] } | {};
  //     ageGroup: (value: string[]) => { ageGroup: AgeGroup[] } | {};
  //     brand: (value: string[]) => { brand: string[] } | {};
  //     productPurpose: (
  //       value: string[]
  //     ) => { productPurpose: ProductPurpose[] } | {};
  //     season: (value: string[]) => { season: string[] } | {};
  //     skinConcern: (value: string[]) => { skinConcern: SkinConcern[] } | {};
  //     ingredients: (value: string[]) => { ingredients: Ingredients[] } | {};
  //   };
  //
  //   const preferenceHandlers: TPreferenceHandlers = {
  //     skinType: (value) => (hasSkinTypePreference ? { skinType: value } : {}),
  //     hairType: (value) => (hasHairTypePreference ? { hairType: value } : {}),
  //     ageGroup: (value) => (hasAgeGroupPreference ? { ageGroup: value } : {}),
  //     brand: (value) => (hasBrandPreference ? { brand: value } : {}),
  //     productPurpose: (value) =>
  //       hasProductPurposePreference ? { productPurpose: value } : {},
  //     season: (value) => (hasSeasonPreference ? { season: value } : {}),
  //     skinConcern: (value) =>
  //       hasSkinConcernPreference
  //         ? { skinConcern: { [Op.contains]: value } }
  //         : {},
  //     ingredients: (value) =>
  //       hasIngredientsPreference
  //         ? { ingredients: { [Op.contains]: value } }
  //         : {},
  //   };
  //
  //   const filterConditions = [];
  //
  //   Object.entries(preferenceHandlers).forEach(([preferenceType, handler]) => {
  //     const preference = preferences.find(
  //       (p) => p.preferenceType === preferenceType
  //     );
  //     if (preference) {
  //       const condition = handler(preference.preferenceValue);
  //       if (Object.keys(condition).length > 0) {
  //         filterConditions.push(condition);
  //       }
  //     }
  //   });
  //
  //   return await this.productsModel.findAll({
  //     where: { [Op.or]: filterConditions },
  //     logging: console.log,
  //   });
  // }

  async getRecommendations(userId: string) {
    const preferences = await this.userPreferencesModel.findAll({
      where: { userId },
    });

    // Преобразование предпочтений в объект для удобного доступа
    const prefsMap = preferences.reduce(
      (acc, { preferenceType, preferenceValue }) => {
        acc[preferenceType] = preferenceValue;
        return acc;
      },
      {}
    );

    // Создание списка условий для поиска
    const searchConditions = Object.entries(prefsMap).map(([key, value]) => {
      return { [key]: value };
    });

    // Использование Op.or для поиска продуктов, соответствующих любому из предпочтений
    const results = await this.productsModel.findAll({
      where: {
        [Op.or]: searchConditions,
      },
    });

    return results;
  }

  //   async getRecommendations(userId: string) {
  //     const preferences = await this.userPreferencesModel.findAll({
  //       where: { userId },
  //     });
  //
  //     // Преобразование предпочтений в объект для удобного доступа
  //     const prefsMap = preferences.reduce(
  //       (acc, { preferenceType, preferenceValue }) => {
  //         acc[preferenceType] = preferenceValue;
  //         return acc;
  //       },
  //       {}
  //     );
  //
  //     // Определение условий для приоритетного поиска
  //     const priorityConditions = [];
  //     if (prefsMap[Preferences.SkinType]) {
  //       priorityConditions.push({ skinType: prefsMap[Preferences.SkinType] });
  //     }
  //     if (prefsMap[Preferences.SkinConcern]) {
  //       priorityConditions.push({
  //         skinConcern: prefsMap[Preferences.SkinConcern],
  //       });
  //     }
  //
  //     // Попытка поиска с использованием приоритетных параметров
  //     if (priorityConditions.length > 0) {
  //       const priorityResults = await this.productsModel.findAll({
  //         where: { [Op.and]: priorityConditions },
  //       });
  //       if (priorityResults.length > 0) return priorityResults;
  //     }
  //
  //     // Если приоритетный поиск не дал результатов, используем остальные параметры
  //     const secondaryConditions = Object.entries(prefsMap)
  //       // @ts-ignore
  //       .filter(([key]) => !Object.values(Preferences).includes(key)) // Исключаем приоритетные параметры
  //       .map(([key, value]) => ({ [key]: value }));
  //
  //     return await this.productsModel.findAll({
  //       where: {
  //         [Op.or]:
  //           secondaryConditions.length > 0
  //             ? secondaryConditions
  //             : priorityConditions,
  //       },
  //     });
  //   }
}
