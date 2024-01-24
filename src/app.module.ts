import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { UserRoles } from "./roles/user-roles.model";
import { Role } from "./roles/roles.model";
import { RolesModule } from "./roles/roles.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { SuggestionsModule } from "./suggestions/suggestions.module";
import { UserPreferences } from "./users/user-preferences.model";
import { Recommendations } from "./products/recommendations.model";
import { Products } from "./products/products.model";
import { RecommendationsController } from './recommendations/recommendations.controller';
import { RecommendationsService } from './recommendations/recommendations.service';

@Module({
  controllers: [RecommendationsController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        UserPreferences,
        Products,
        Recommendations,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    SuggestionsModule,
  ],
  providers: [RecommendationsService],
})
export class AppModule {}
