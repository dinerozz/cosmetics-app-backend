import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Notes } from "./notes.model";
import { CreateNoteDto } from "./dto/create_note.dto";

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes) private notesRepository: typeof Notes) {}

  async createNote(newNote: CreateNoteDto) {
    return await this.notesRepository.create(newNote);
  }

  async getNotes(userId: string) {
    return this.notesRepository.findAll({ where: { userId } });
  }
}
