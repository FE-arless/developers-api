import { CreateResumeDTO } from "../dto/create.resume.dto";
import { UpdateResumeDTO } from "../dto/update.resume.dto";
import { Resume, ResumeList } from "../entities/resume";

export interface IResumeService {
    //이력서 저장 
    createResume(email: string, resumeInfo: CreateResumeDTO): Promise<Boolean | undefined>

    //이력서 상세 조회
    getResume(resumeKey: string): Promise<Resume | undefined>

    //이력서 업데이트
    updateResume(resumeKey: string, resumeInfo: UpdateResumeDTO): Promise<Resume | undefined>

    //이력서 삭제
    deleteResume(resumeKey: string): Promise<Boolean | undefined>

    //이력서 전체조회
    getResumeList(email: string): Promise<Resume[] | undefined>
}