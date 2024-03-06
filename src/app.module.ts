import { Module, OnModuleInit } from "@nestjs/common";
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
import { UserPreferences } from "./user-preferences/user-preferences.model";
import { Recommendations } from "./recommendations/recommendations.model";
import { Products } from "./products/products.model";
import { RecommendationsModule } from "./recommendations/recommendations.module";
import { UserPreferencesModule } from "./user-preferences/user-preferences.module";
import { Categories } from "./categories/categories.model";
import { CategoriesService } from "./categories/categories.service";
import { ProductsService } from "./products/products.service";
import { productsData } from "./products/constants";
import { categoryData } from "./categories/constants";

@Module({
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
        Categories,
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
    RecommendationsModule,
    UserPreferencesModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService
  ) {}

  async onModuleInit() {
    await this.categoriesService.fillCategories(categoryData);
    await this.productsService.fillProducts(productsData);
  }
}
