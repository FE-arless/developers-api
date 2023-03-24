import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { DashboardSchedule } from "../../entities/dashboard.schedule";
import { IDashboardCalendarRepository } from "./dashboard.schedule.repository.interface";


@CustomRepository(DashboardSchedule)
export class DashboardCalendarRepository extends Repository<DashboardSchedule> implements IDashboardCalendarRepository {

}