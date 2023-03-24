import { ConsoleLogger, HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateResumeDTO } from '../dto/create.resume.dto';
import { UpdateResumeDTO } from '../dto/update.resume.dto';
import { Resume, ResumeList } from '../entities/resume';
import { ResumeInfoRepository } from '../repository/resume.info.repository';
import { ResumeRepository } from '../repository/resume.repository';
import { IResumeService } from './resume.service.interface';

@Injectable()
export class ResumeService implements IResumeService {
    constructor(
        private readonly resumeRepository: ResumeRepository,
        private readonly resumeInfoRepository: ResumeInfoRepository
    ){}

    async createResume(email: string, resumeInfo: CreateResumeDTO): Promise<Boolean> {
        const resumeList = await this.resumeRepository.findResumeListByEmail(email)

        console.log(resumeList)
        if (resumeList) { //리스트 존재 = 유저 존재
            
            var resume = new Resume()
            resume = {...resumeInfo, ...resume}
            resume.resumeList = resumeList //리스트 연관 관계 맺어줌
            await this.resumeInfoRepository.save(resume)

        } else { //없으면 유저 없는 거 
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)  
        }

        return true
    }

    async getResume(resumeKey: string): Promise<Resume> {
        
        return await this.resumeInfoRepository.findOne({where: {resumeKey: resumeKey}})
    }

    async updateResume(resumeKey: string, resumeInfo: UpdateResumeDTO): Promise<Resume> {
        const resume = await this.resumeInfoRepository.findOne({where: {resumeKey: resumeKey}})

        return await this.resumeInfoRepository.save({
            ...resume,
            ...resumeInfo,
        })
    }

    async deleteResume(resumeKey: string): Promise<Boolean> {
        try {
            await this.resumeInfoRepository.delete(resumeKey)
        } catch(err) {
            console.log(err)
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return true
    }

    async getResumeList(email: string): Promise<Resume[]> {
        return (await this.resumeRepository.findOne({where: {userEmail: email}, relations: ["resumes"]})).resumes
    }
}
