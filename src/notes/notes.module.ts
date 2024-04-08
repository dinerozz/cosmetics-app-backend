import { Module } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NotesController } from "./notes.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Notes } from "./notes.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [NotesService],
  imports: [SequelizeModule.forFeature([Notes, User]), JwtModule],
  controllers: [NotesController],
})
export class NotesModule {}
