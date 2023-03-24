import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { Dashboard } from "../entities/dashboard";
import { IDashBoardRepository } from "./apply.dashboard.repository.interface";


@CustomRepository(Dashboard)
export class ApplyRepository extends Repository<Dashboard> implements IApplyRepository {

}