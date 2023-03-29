import { CreateScheduleDTO } from "../../dto/schedule/create.schedule.dto";
import { UpdateScheduleDTO } from "../../dto/schedule/update.schedule.dto";
import { DashboardSchedule } from "../../entities/dashboard.schedule";

export interface IDashboardScheduleService {
    getSchedule(email: string): Promise<DashboardSchedule[] | undefined>
    createSchedule(email: string, scheduleInfo: CreateScheduleDTO): Promise<DashboardSchedule | undefined>
    updateSchedule(email: string, scheduleInfo: UpdateScheduleDTO): Promise<DashboardSchedule | undefined>
    deleteSchedule(email: string, scheduleId: number): Promise<Boolean | undefined>
}