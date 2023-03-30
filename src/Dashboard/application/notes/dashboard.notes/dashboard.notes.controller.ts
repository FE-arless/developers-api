import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateNoteDTO } from 'src/Dashboard/domain/dto/notes/create.note.dto';
import { UpdateNoteDTO } from 'src/Dashboard/domain/dto/notes/update.note.dto';
import { DashboardNotes } from 'src/Dashboard/domain/entities/dashboard.notes';
import { DashboardNotesService } from 'src/Dashboard/domain/service/notes/dashboard.notes.service';
import { User } from 'src/Users/domain/entities/user';

@ApiTags('Dashboard_Notes')
@ApiBearerAuth()
@Controller('dashboard/notes')
export class DashboardNotesController {
    constructor(
        private readonly dashboardNotesService: DashboardNotesService
    ){}


    @ApiResponse({
        status: 200,
        description: '특정 유저의 노트 목록',
        type: Array<DashboardNotes>,
    })
    @UseGuards(AuthGuard('access'))
    @ApiQuery({ type: Number })
    @Get('')
    async getNotes(@Req() req: Request, @Query('started_at') startedAt?: number): Promise<DashboardNotes[] | undefined> {
        return await this.dashboardNotesService.getNotes((req.user as User).email, startedAt)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저의 노트 생성 후 데이터',
        type: DashboardNotes,
    })
    @UseGuards(AuthGuard('access'))
    @ApiBody({type: CreateNoteDTO})
    @Post('create')
    async createNote(@Req() req: Request, @Body() noteInfo: CreateNoteDTO): Promise<DashboardNotes | undefined> {
        return await this.dashboardNotesService.createNote((req.user as User).email, noteInfo)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저의 노트를 수정하고 난 후 데이터',
        type: DashboardNotes,
    })
    @UseGuards(AuthGuard('access'))
    @ApiBody({type: UpdateNoteDTO})
    @Post('update')
    async updateNote(@Req() req: Request, @Body() noteInfo: UpdateNoteDTO): Promise<DashboardNotes | undefined> {
        return await this.dashboardNotesService.updateNote((req.user as User).email, noteInfo)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저의 노트 삭제여부',
        type: Boolean,
    })
    @UseGuards(AuthGuard('access'))
    @ApiQuery({ type: Number })
    @Post('delete')
    async deleteNote(@Req() req: Request, @Query('noteId') noteId: number): Promise<Boolean | undefined> {
        return await this.dashboardNotesService.deleteNote((req.user as User).email, noteId)
    }
}
