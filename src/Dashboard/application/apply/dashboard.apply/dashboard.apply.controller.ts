import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateApplyDTO } from 'src/Dashboard/domain/dto/apply/create.apply.dto';
import { UpdateApplyDTO } from 'src/Dashboard/domain/dto/apply/update.apply.dto';
import { DashboardApply } from 'src/Dashboard/domain/entities/dashboard.apply';
import { DashboardApplyService } from 'src/Dashboard/domain/service/apply/dashboard.apply.service';
import { User } from 'src/Users/domain/entities/user';

@ApiTags('Dashboard_Apply')
@ApiBearerAuth()
@Controller('dashboard/apply')
export class DashboardApplyController {
    constructor(
        private readonly dashboardApplyService: DashboardApplyService
    ){}

    @UseGuards(AuthGuard('access'))
    @Get('')
    async getApply(@Req() req: Request, @Query('started_at') startedAt: number): Promise<DashboardApply[] | undefined> {
        return this.dashboardApplyService.getApplyList((req.user as User).email, startedAt)
    }

    @UseGuards(AuthGuard('access'))
    @ApiBody({type: CreateApplyDTO})
    @Post('create')
    async createApply(@Req() req: Request, @Body() applyInfo: CreateApplyDTO): Promise<DashboardApply | undefined> {
        
        return await this.dashboardApplyService.createApplyInfo((req.user as User).email, applyInfo)
    }

    @UseGuards(AuthGuard('access'))
    @ApiBody({type: UpdateApplyDTO})
    @Post('update')
    async updateApply(@Req() req: Request, @Body() applyInfo: UpdateApplyDTO): Promise<DashboardApply | undefined> {
        
        return await this.dashboardApplyService.updateApplyInfo((req.user as User).email, applyInfo)
    }

    @UseGuards(AuthGuard('access'))
    @ApiQuery({ type: Number })
    @Post('delete')
    async deleteApply(@Req() req: Request, @Query('applyId') applyId: number): Promise<Boolean | undefined> {
        
        return await this.dashboardApplyService.deleteApplyInfo((req.user as User).email, applyId)
    }
}
