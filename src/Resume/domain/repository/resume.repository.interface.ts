import { Resume, ResumeList } from "../entities/resume";

export interface IResumeRepository {
    findOneByResume(resumeKey: string): Promise<Resume | undefined>

    findResumeListByEmail(email: string): Promise<ResumeList | undefined>
}