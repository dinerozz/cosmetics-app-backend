import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create_note.dto";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createNote(@Body() note: CreateNoteDto) {
    return await this.notesService.createNote(note);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(":userId")
  async getNotes(@Param("userId") userId: string) {
    return await this.notesService.getNotes(userId);
  }
}
