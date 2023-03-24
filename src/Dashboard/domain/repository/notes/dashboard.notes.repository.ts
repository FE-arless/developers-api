import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { DashboardNotes } from "../../entities/dashboard.notes";
import { IDashboardNotesRepository } from "./dashboard.notes.repository.interface";


@CustomRepository(DashboardNotes)
export class DashboardNotesRepository extends Repository<DashboardNotes> implements IDashboardNotesRepository {

}