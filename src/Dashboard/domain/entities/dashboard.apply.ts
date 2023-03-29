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
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'company_name'})
    companyName: string;

    @Column({ type: 'enum', enum: UserApplyStatus })
    status: UserApplyStatus;

    @Column()
    position: string;

    @Column({ type: 'enum', enum: UserPerformanceLevel })
    level: UserPerformanceLevel;

    @Column({ nullable: true })
    salary?: string;

    @Column({ name: 'teck_stack' })
    teckStack: string;

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