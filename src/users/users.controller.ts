import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles-guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";
import { Headers } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Update user profile" })
  @ApiResponse({ status: 200, type: User })
  @Patch("/profile")
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @Body() userDto: CreateUserDto,
    @Headers("authorization") token: string
  ) {
    return this.userService.updateProfile(userDto, token);
  }

  @ApiOperation({ summary: "Update user profile" })
  @ApiResponse({ status: 200, type: User })
  @Patch("/profile-image")
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(JwtAuthGuard)
  updateProfileImage(
    @UploadedFile() file,
    @Body() userDto: CreateUserDto,
    @Req() req
  ) {
    return this.userService.updateProfileImage(file, req.headers.authorization);
  }

  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("/user/:id")
  getUserById(@Param("id") userId: string) {
    return this.userService.getUserById(userId);
  }

  @ApiOperation({ summary: "Get current user" })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(RolesGuard)
  @Get("/current")
  getCurrentUser(@Headers() headers) {
    return this.userService.getCurrentUser(headers);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Set role" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Ban user" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/ban")
  ban(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }
}
