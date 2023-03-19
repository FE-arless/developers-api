import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateResumeDTO } from 'src/Resume/domain/dto/update.resume.dto';
import { CreateResumeDTO } from 'src/Resume/domain/dto/create.resume.dto';
import { Resume, ResumeList } from 'src/Resume/domain/entities/resume';
import { IResumeService } from 'src/Resume/domain/service/resume.service.interface';
import { ResumeService } from 'src/Resume/domain/service/resume.service';


@Controller('resume')
export class ResumeController {
    constructor(
        private readonly resumeService: ResumeService
    ){}

    @UseGuards(AuthGuard('access'))
    @Get('list/')
    async getResumeInfo(@Query('resumeKey') resumeKey: string): Promise<Resume | undefined> {
        return this.resumeService.getResume(resumeKey)
    }

    @UseGuards(AuthGuard('access'))
    @Post('list/create')
    async createResumeInfo(@Query('email') email: string, @Body() resumeInfo: CreateResumeDTO): Promise<Boolean | undefined> {
        return this.resumeService.createResume(email, resumeInfo)
    }

    @UseGuards(AuthGuard('access'))
    @Post('list/update')
    async updateResumeInfo(@Query('resumeKey') resumeKey: string, @Body() resumeInfo: UpdateResumeDTO): Promise<Resume | undefined> {
        return this.resumeService.updateResume(resumeKey, resumeInfo)
    }

    @UseGuards(AuthGuard('access'))
    @Post('list/delete')
    async deleteResumeInfo(@Query('resumeKey') resumeKey: string): Promise<Boolean | undefined> {
        return this.resumeService.deleteResume(resumeKey)
    }

    @UseGuards(AuthGuard('access'))
    @Get('')
    async getResumeList(@Query('email') email: string): Promise<Resume[] | undefined> {
        console.log((await this.resumeService.getResumeList(email)))
        return (await this.resumeService.getResumeList(email))
    }
}
