import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { Resume, ResumeList } from "../entities/resume";
import { ResumeService } from "../service/resume.service";
import { IResumeRepository } from "./resume.repository.interface";

@CustomRepository(ResumeList)
export class ResumeRepository extends Repository<ResumeList> implements IResumeRepository {
     async findOneByResume(resumeKey: string): Promise<Resume | undefined> {
        
        //const resume = (await this.findOne({where: {resumes: {resumeKey: resumeKey}},relations: ['resume']}))

        return undefined;
     }

     async findResumeListByEmail(email: string): Promise<ResumeList | undefined> {
       return await this.findOne({ where: { userEmail: email } })
     }

}