export class CreateNoteDto {
  readonly userId: string;
  readonly title: string;
  readonly description?: string;
}
