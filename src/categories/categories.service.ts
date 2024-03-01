import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Categories } from "./categories.model";
import { CreateCategoryDto } from "./dto/create-category.dto";

export const categoryData = [
  // Категории для ухода за кожей
  { name: "Увлажнение", description: "Продукты для увлажнения кожи." },
  { name: "Питание", description: "Продукты для питания кожи." },
  { name: "Очищение", description: "Средства для очищения кожи." },
  {
    name: "Защита",
    description: "Продукты для защиты кожи от солнца и загрязнений.",
  },

  // Категории для ухода за волосами
  {
    name: "Уход за волосами",
    description: "Продукты для питания, увлажнения и восстановления волос.",
  },
  {
    name: "Стилизация волос",
    description: "Средства для укладки и стилизации волос.",
  },

  // Категории для тела
  {
    name: "Уход за телом",
    description: "Лосьоны, кремы и масла для увлажнения и питания кожи тела.",
  },
  {
    name: "Солнцезащитные средства для тела",
    description: "Продукты для защиты кожи тела от УФ-лучей.",
  },

  // Другие категории
  {
    name: "Декоративная косметика",
    description: "Продукты для создания макияжа.",
  },
  {
    name: "Средства для ногтей",
    description: "Лаки, укрепители и другие продукты для ухода за ногтями.",
  },
  // Добавьте другие категории по вашему выбору
];

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories)
    private categoryModel: typeof Categories
  ) {}

  async addCategory(name: string, description: string): Promise<Categories> {
    const [category, created] = await this.categoryModel.findOrCreate({
      where: { name },
      defaults: { name, description },
    });

    if (created) {
      console.log(`Категория ${name} успешно добавлена.`);
    } else {
      console.log(`Категория ${name} уже существует.`);
    }

    return category;
  }

  async fillCategories(
    categoriesData: { name: string; description: string }[]
  ) {
    for (const { name, description } of categoriesData) {
      await this.addCategory(name, description);
    }
  }

  async create(createCategoryDto: CreateCategoryDto[]) {
    return this.categoryModel.bulkCreate(createCategoryDto);
  }

  async findAll(): Promise<Categories[]> {
    return this.categoryModel.findAll();
  }

  async findOne(id: string): Promise<Categories> {
    return this.categoryModel.findByPk(id);
  }

  async update(
    id: string,
    updateCategoryDto: CreateCategoryDto
  ): Promise<void> {
    await this.categoryModel.update(updateCategoryDto, {
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await category.destroy();
  }
}
