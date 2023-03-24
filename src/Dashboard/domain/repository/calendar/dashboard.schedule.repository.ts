import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { DashboardSchedule } from "../../entities/dashboard.schedule";
import { IDashboardScheduleRepository } from "./dashboard.schedule.repository.interface";


@CustomRepository(DashboardSchedule)
export class DashboardScheduleRepository extends Repository<DashboardSchedule> implements IDashboardScheduleRepository {

}