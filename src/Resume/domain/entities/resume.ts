import { ApiProperty } from "@nestjs/swagger";
import { identity } from "rxjs";
import { User } from "src/Users/domain/entities/user";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";


@Entity('resume_list')
export class ResumeList {
    @ApiProperty({ example: 1, description: '유저 이력서 목록 고유 아이디' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "sss@sss.com", description: '유저 이메일' })
    @Column({name: 'user_email', unique: true})
    userEmail: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @OneToMany(
        (type) => Resume,
        (resumes) => resumes.resumeList, { cascade: true, lazy: true }
    )
    resumes!: Resume[];
}

@Entity('resume')
export class Resume {

    @ApiProperty({ example: 'dwdwdw1-dwjkid2k9', description: '유저 이력서 고유 키' })
    @PrimaryGeneratedColumn('uuid')
    resumeKey: string;

    @ApiProperty({ example: '센트의 이력서', description: '유저 이력서 제목' })
    @Column()
    title: string;
    
    @ApiProperty({ example: 'swift, Rxswift', description: '유저 이력서 스킬셋' })
    @Column()
    skills: string;

    @ApiProperty({ example: '카카오: ~', description: '유저 이력서 경력' })
    @Column()
    career: string;

    @ApiProperty({ example: '땡떙대학교', description: '유저 이력서 학력' })
    @Column()
    education: string;

    @ApiProperty({ example: 'sss@sss.com', description: '유저 이메일' })
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

