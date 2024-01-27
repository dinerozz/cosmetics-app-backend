import { Module } from "@nestjs/common";
import { UserPreferencesService } from "./user-preferences.service";
import { UserPreferencesController } from "./user-preferences.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { UserPreferences } from "./user-preferences.model";

@Module({
  providers: [UserPreferencesService],
  controllers: [UserPreferencesController],
  imports: [SequelizeModule.forFeature([UserPreferences, User])],
})
export class UserPreferencesModule {}
