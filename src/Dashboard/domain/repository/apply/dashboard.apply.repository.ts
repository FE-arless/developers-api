import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { DashboardApply } from "../../entities/apply";
import { IDashboardApplyRepository } from "./dashboard.apply.repository.interface";


@CustomRepository(DashboardApply)
export class DashboardApplyRepository extends Repository<DashboardApply> implements IDashboardApplyRepository {

}