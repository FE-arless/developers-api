import { User } from "src/Users/domain/entities/user";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum UserApplyStatus {
    Applied = 'Applied',
    AppliedScheduled = 'AppliedScheduled',
    Dropped = 'Dropped',
    Proceeding = 'Proceeding',
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

    @Column({ enum: UserApplyStatus })
    status: UserApplyStatus;

    @Column()
    position: string;

    @Column({ enum: UserPerformanceLevel })
    level: UserPerformanceLevel;

    @Column({ nullable: true })
    salary?: string;

    @Column({ name: 'teck_stack' })
    teckStack: string[];

    @Column({ name: 'job_post_url' })
    jobPostUrl: string;

    @ManyToOne(
        (type) => User,
        (user) => user.applies, {nullable: true, onDelete: 'CASCADE'}
    )
    user: User;
}

