import { identity } from "rxjs";
import { User } from "src/Users/domain/entities/user";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";


@Entity('resume_list')
export class ResumeList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_email', unique: true})
    userEmail: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @OneToMany(
        (type) => Resume,
        (resumes) => resumes.resumeList,
    )
    resumes!: Resume[];
}

@Entity('resume')
export class Resume {
    
    // static async findOne(arg0: { where: { resumeKey: string; }; relations: string[]; }) {
    //     const resume = await Resume.findOne({
    //         where: { resumeKey: arg0.where.resumeKey },
    //         relations: ['resumeList'],
    //       });
    //     return resume;
    // }

    @PrimaryGeneratedColumn('uuid')
    resumeKey: string;

    @Column()
    title: string;
    
    @Column()
    skills: string;

    @Column()
    career: string;

    @Column()
    education: string;

    @Column()
    userEmail: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @ManyToOne(
        (type) => ResumeList,
        (resumeList) => resumeList.resumes, {nullable: true, onDelete: 'CASCADE'}
    )
    resumeList!: ResumeList;

}

