import { CreateApplyDTO } from "../../dto/apply/create.apply.dto";
import { UpdateApplyDTO } from "../../dto/apply/update.apply.dto";
import { DashboardApply } from "../../entities/dashboard.apply";

export interface IDashboardApplyService {
    getApplyList(email: string, startedAt: number): Promise<DashboardApply[] | undefined>
    createApplyInfo(email: string, applyInfo: CreateApplyDTO): Promise<DashboardApply | undefined>
    updateApplyInfo(email: string, applyInfo: UpdateApplyDTO): Promise<DashboardApply | undefined>
    deleteApplyInfo(email: string, applyInfoId: number): Promise<Boolean | undefined>
}