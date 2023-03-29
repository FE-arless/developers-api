import { CreateNoteDTO } from "../../dto/notes/create.note.dto";
import { UpdateNoteDTO } from "../../dto/notes/update.note.dto";
import { DashboardNotes } from "../../entities/dashboard.notes";

export interface IDashboardNotesService {
    getNotes(email: string, startedAt?: number): Promise<DashboardNotes[] | undefined>
    createNote(email: string, noteInfo: CreateNoteDTO): Promise<DashboardNotes | undefined>
    updateNote(email: string, noteInfo: UpdateNoteDTO): Promise<DashboardNotes | undefined>
    deleteNote(email: string, noteId: number): Promise<Boolean | undefined>
}