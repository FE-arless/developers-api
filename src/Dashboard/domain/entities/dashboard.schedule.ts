import { User } from "src/Users/domain/entities/user";
import { Column, Entity, Long, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ScheduleType {
    Task = 'Task',
    Reminders = 'Reminders',
    Meeting = 'Meeting',
    Appointment = 'Appointment'
}

@Entity('dashboard_schedule') 
export class DashboardSchedule { //유저의 대시보드 id = email을 참조
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    time: BigInt;

    @Column()
    description: string;

    @Column({ name: 'schedule_type', enum: ScheduleType })
    scheduleType: ScheduleType;

    @ManyToOne(
        (type) => User,
        (user) => user.schedules, {nullable: true, onDelete: 'CASCADE'}
    )
    user: User;
}