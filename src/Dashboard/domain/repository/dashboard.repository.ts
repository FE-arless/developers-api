import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { Dashboard } from "../entities/dashboard";
import { IDashBoardRepository } from "./dashboard.repository.interface";


@CustomRepository(Dashboard)
export class DashboardRepository extends Repository<Dashboard> implements IDashBoardRepository {

}