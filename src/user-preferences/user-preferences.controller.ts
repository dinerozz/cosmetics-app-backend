import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserPreferencesDto } from "./dto/user-preferences.dto";
import { UserPreferencesService } from "./user-preferences.service";

@Controller("user-preferences")
export class UserPreferencesController {
  constructor(private userPreferencesService: UserPreferencesService) {}

  @Post()
  async create(@Body() userPreferences: UserPreferencesDto) {
    return this.userPreferencesService.create(userPreferences);
  }

  @Get()
  async findAll() {
    return this.userPreferencesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    console.log("123123");
    return this.userPreferencesService.findOne(id);
  }
}
