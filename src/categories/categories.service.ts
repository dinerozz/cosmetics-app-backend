import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Categories } from "./categories.model";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories)
    private categoryModel: typeof Categories
  ) {}

  async addCategory(
    id: string,
    name: string,
    description: string
  ): Promise<Categories> {
    const [category, created] = await this.categoryModel.findOrCreate({
      where: { name },
      defaults: { id, name, description },
    });

    if (created) {
      console.log(`Категория ${name} успешно добавлена.`);
    } else {
      console.log(`Категория ${name} уже существует.`);
    }

    return category;
  }

  async fillCategories(
    categoriesData: { id: string; name: string; description: string }[]
  ) {
    for (const { id, name, description } of categoriesData) {
      await this.addCategory(id, name, description);
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
