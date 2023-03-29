import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/Users/domain/entities/user';
import { UserRepository } from 'src/Users/domain/repository/user.repository';
import { CreateNoteDTO } from '../../dto/notes/create.note.dto';
import { UpdateNoteDTO } from '../../dto/notes/update.note.dto';
import { DashboardNotes } from '../../entities/dashboard.notes';
import { DashboardNotesRepository } from '../../repository/notes/dashboard.notes.repository';
import { IDashboardNotesService } from './dashboard.notes.service.interface';

@Injectable()
export class DashboardNotesService implements IDashboardNotesService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly dashboardNotesRepository: DashboardNotesRepository
    ){}

    async getNotes(email: string, startedAt: number = 0): Promise<DashboardNotes[]> {
        var user = await this.userRepository.findByEmail(email)

        if (user) {
            const notes = await user.notes
            console.log(notes.length)

            if (notes.length != 0) {

                const diff = notes.length - startedAt;

                if (notes.length == 0) {
                    throw new HttpException('not found applies', HttpStatus.NOT_FOUND)   
                } else if (notes.length < 5) {
                    return notes
                } else if (diff < 5) {
                    return notes.slice(startedAt, startedAt + diff)
                } else {
                    return notes.slice(startedAt, startedAt + 5)
                }
            } else {
                throw new HttpException('not found user`s notes', HttpStatus.FORBIDDEN)   
            }
        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)   
        }
    }

    async createNote(email: string, noteInfo: CreateNoteDTO): Promise<DashboardNotes> {
        var user = await this.userRepository.findByEmail(email)

        if (user) {
            var note = new DashboardNotes()

            note = {
                ...note,
                ...noteInfo
            }

            note.user = { id: user.id, email: user.email } as User;

            try {
                await this.dashboardNotesRepository.save(note)
            } catch(err) {
                console.log(err)
                throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }

            return note
        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)
        }
    }

    async updateNote(email: string, noteInfo: UpdateNoteDTO): Promise<DashboardNotes> {
        var user = await this.userRepository.findByEmail(email)

        if (user) {
            const notes = user.notes
            
            if (!notes) {
                throw new HttpException('not found user`s notes', HttpStatus.FORBIDDEN)   
            }

            var matchNote: DashboardNotes = null;

            (await notes).forEach(obj => {
                if (obj.id == noteInfo.id) {
                    matchNote = obj
                } else {
                    return
                }
            })

            if (matchNote) {
                

                matchNote = {
                    ...matchNote,
                    ...noteInfo
                }

                matchNote.user = { id: user.id, email: user.email } as User;

                try {
                    await this.dashboardNotesRepository.save(matchNote)
                } catch(err) {
                    console.log(err)
                    throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
                }

                return matchNote
            }
        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)
        }
    }

    async deleteNote(email: string, noteId: number): Promise<Boolean> {
        var user = await this.userRepository.findByEmail(email)

        if (user) {

            const notes = await user.notes
            
            if (!notes) {
                throw new HttpException('not found user`s notes', HttpStatus.FORBIDDEN)   
            }

            var note: DashboardNotes = null

            notes.forEach(obj => {
                if (obj.id == noteId) {
                    note = obj
                } else {
                    return
                }
            })

            if (note) {

                try {
                    await this.dashboardNotesRepository.delete(note.id)
                } catch(err) {
                    console.log(err)
                    throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)      
                }
                return true
            }

        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)
        }
    }
}
