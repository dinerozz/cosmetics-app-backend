import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserPreferencesDto } from "./dto/user-preferences.dto";
import { UserPreferencesService } from "./user-preferences.service";

@Controller("user-preferences")
export class UserPreferencesController {
  constructor(private userPreferencesService: UserPreferencesService) {}

  @Post()
  async create(
    @Body() body: { userPreferences: UserPreferencesDto[]; userId: string }
  ) {
    console.log(body.userId, "usuuuisd");
    return this.userPreferencesService.create(
      body.userPreferences,
      body.userId
    );
  }

  @Get(":id")
  async findAll(@Param("id") id: string) {
    return this.userPreferencesService.findAll(id);
  }

  @Get("id/:id")
  async findOne(@Param("id") id: string) {
    console.log("123123");
    return this.userPreferencesService.findOne(id);
  }
}
