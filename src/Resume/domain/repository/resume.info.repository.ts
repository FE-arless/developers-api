import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { Resume } from "../entities/resume";
import { IResumeInfoRepository } from "./resume.info.repository.interface";

@CustomRepository(Resume)
export class ResumeInfoRepository extends Repository<Resume> implements IResumeInfoRepository {
    
}