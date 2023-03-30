import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/Users/domain/entities/user";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


export enum UserApplyStatus {
    Applied = 'Applied',
    AppliedScheduled = 'AppliedScheduled',
    Dropped = 'Dropped',
    Proceeding = 'Proceeding',
    Passed = 'Passed'
}

export enum UserPerformanceLevel {
    Junior = 'Junior',
    Middle = 'Middle',
    Senior = 'Senior'
}

@Entity('dashboard_apply')
export class DashboardApply { //유저의 대시보드 id = email을 참조

    @ApiProperty({ example: 1, description: '유저 지원현황 고유 아이디' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '카카오', description: '유저가 지원한 회사이름' })
    @Column({ name: 'company_name'})
    companyName: string;

    @ApiProperty({ example: 'Passed', description: '유저 지원전형의 상태' })
    @Column({ type: 'enum', enum: UserApplyStatus })
    status: UserApplyStatus;

    @ApiProperty({ example: 'iOS Engineer', description: '유저가 지원한 개발 포지션' })
    @Column()
    position: string;

    @ApiProperty({ example: 'Junior', description: '유저 자신의 개발 수준' })
    @Column({ type: 'enum', enum: UserPerformanceLevel })
    level: UserPerformanceLevel;

    @ApiProperty({ example: '100k', description: '유저가 지원한 포지션 연봉' })
    @Column({ nullable: true })
    salary?: string;

    @ApiProperty({ example: 'swift, Rxswift', description: '유저가 지원한 포지션의 기술 스택' })
    @Column({ name: 'teck_stack' })
    teckStack: string;

    @ApiProperty({ example: 'https://example.com', description: '지원한 포지션 관련 주소' })
    @Column({ name: 'job_post_url', nullable: true })
    jobPostUrl: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Timestamp

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Timestamp
    
    @ManyToOne(
        (type) => User,
        (user) => user.applies, { nullable: true, onDelete: 'CASCADE' }
    )
    user: User;
}

const applyStatusMap: Record<string, UserApplyStatus> = {
    'Applied': UserApplyStatus.Applied,
    'AppliedScheduled': UserApplyStatus.AppliedScheduled,
    'Dropped': UserApplyStatus.Dropped,
    'Proceeding': UserApplyStatus.Proceeding,
    'Passed': UserApplyStatus.Passed
};

const userPerformanceLevelMap: Record<string, UserPerformanceLevel> = {
    'Junior': UserPerformanceLevel.Junior,
    'Middle': UserPerformanceLevel.Middle,
    'Senior': UserPerformanceLevel.Senior
}

export function getStatus(statusString: string): UserApplyStatus | undefined {
    return applyStatusMap[statusString]
}

export function getLevel(levelString: string): UserPerformanceLevel | undefined {
    return userPerformanceLevelMap[levelString]
}