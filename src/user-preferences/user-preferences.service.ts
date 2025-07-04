import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserPreferences } from "./user-preferences.model";
import { UserPreferencesDto } from "./dto/user-preferences.dto";

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreferences)
    private userPreferencesModel: typeof UserPreferences
  ) {}

  async create(userPreferences: UserPreferencesDto[], userId: string) {
    await this.userPreferencesModel.destroy({
      where: { userId: userId },
    });

    const updatedPreferences = userPreferences.map((pref) => ({
      ...pref,
      userId: userId,
    }));

    return this.userPreferencesModel.bulkCreate(updatedPreferences);
  }

  async findAll(id: string) {
    return this.userPreferencesModel.findAll({ where: { userId: id } });
  }

  async findOne(id: string) {
    return this.userPreferencesModel.findOne({ where: { userId: id } });
  }
}
