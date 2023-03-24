import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { Dashboard } from "../entities/dashboard";
import { INotesRepository } from "./dashboard.repository.interface";


@CustomRepository(Dashboard)
export class NotesRepository extends Repository<Dashboard> implements INotesRepository {

}