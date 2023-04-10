import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UpdateResumeDTO } from 'src/Resume/domain/dto/update.resume.dto';
import { CreateResumeDTO } from 'src/Resume/domain/dto/create.resume.dto';
import { Resume, ResumeList } from 'src/Resume/domain/entities/resume';
import { IResumeService } from 'src/Resume/domain/service/resume.service.interface';
import { ResumeService } from 'src/Resume/domain/service/resume.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/Users/domain/entities/user';

@ApiTags('Resume')
@ApiBearerAuth()
@Controller('/api/v1/resume')
export class ResumeController {
    constructor(
        private readonly resumeService: ResumeService
    ){}

    @ApiResponse({
        status: 200,
        description: '특정 유저의 이력서 목록',
        type: Array<Resume>,
    })
    @UseGuards(AuthGuard('access'))
    @Get('')
    async getResumeList(@Req() req: Request): Promise<Resume[] | undefined> {
        
        return (await this.resumeService.getResumeList((req.user as User).email))
    }
    
    @ApiResponse({
        status: 200,
        description: '특정 유저의 이력서',
        type: Resume,
    })
    @UseGuards(AuthGuard('access'))
    @Get('list/')
    async getResumeInfo(@Query('resumeKey') resumeKey: string): Promise<Resume | undefined> {
        return await this.resumeService.getResume(resumeKey)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저의 이력서 생성여부',
        type: Boolean,
    })
    @UseGuards(AuthGuard('access'))
    @Post('list/create')
    async createResumeInfo(@Req() req: Request, @Body() resumeInfo: CreateResumeDTO): Promise<Boolean | undefined> {
        return await this.resumeService.createResume((req.user as User).email, resumeInfo)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저의 이력서 수정하고 난 후 데이터',
        type: Resume,
    })
    @UseGuards(AuthGuard('access'))
    @Post('list/update')
    async updateResumeInfo(@Query('resumeKey') resumeKey: string, @Body() resumeInfo: UpdateResumeDTO): Promise<Resume | undefined> {
        return await this.resumeService.updateResume(resumeKey, resumeInfo)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저의 이력서 삭제여부',
        type: Boolean,
    })
    @UseGuards(AuthGuard('access'))
    @Post('list/delete')
    async deleteResumeInfo(@Query('resumeKey') resumeKey: string): Promise<Boolean | undefined> {
        return await this.resumeService.deleteResume(resumeKey)
    }
}
