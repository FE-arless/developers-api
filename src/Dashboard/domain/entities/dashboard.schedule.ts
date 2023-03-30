import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/Users/domain/entities/user";
import { Column, CreateDateColumn, Entity, Long, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

export enum ScheduleType {
    Task = 'Task',
    Reminders = 'Reminders',
    Meeting = 'Meeting',
    Appointment = 'Appointment'
}

@Entity('dashboard_schedule') 
export class DashboardSchedule { //유저의 대시보드 id = email을 참조
    @ApiProperty({ example: 1, description: '유저 스케줄 고유 아이디' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '점심 약속', description: '유저 스케줄 제목' })
    @Column()
    title: string;

    @ApiProperty({ example: new Date(), description: '유저 스케줄 날짜' })
    @Column({name: 'schedule_date'})
    scheduleDate: Date;

    @ApiProperty({ example: '챙겨가야할 것', description: '유저 스케줄 설명' })
    @Column()
    description: string;

    @ApiProperty({ example: 'Meeting', description: '유저 스케줄 타입' })
    @Column({ name: 'schedule_type', type: 'enum', enum: ScheduleType })
    scheduleType: ScheduleType;

    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Timestamp

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Timestamp
    
    @ManyToOne(
        (type) => User,
        (user) => user.schedules, {nullable: true, onDelete: 'CASCADE'}
    )
    user: User;
}

const scheduleTypeMap: Record<string, ScheduleType> = {
    'Task': ScheduleType.Task,
    'Reminders': ScheduleType.Reminders,
    'Meeting': ScheduleType.Meeting,
    'Appointment': ScheduleType.Appointment,
};


export function getScheduleType(scheduleType: string): ScheduleType | undefined {
    return ScheduleType[scheduleType]
}

export function timestampToUnix(timestamp: Date): number {
    return Math.floor(timestamp.getTime() / 1000);
}

export function unixToTimestamp(unixTime: number): Date {
    return new Date(unixTime * 1000);
}

export function getMatchesSchedule(schedules: DashboardSchedule[]): DashboardSchedule[] | undefined {
    const now = new Date();
    const koreanNow = new Date(now.getTime() + 9 * 60 * 60 * 1000); // 한국 시간 기준으로 변경
    const month = koreanNow.getMonth() + 1; //현재 월뽑고.

    var scheduleList: Array<DashboardSchedule> = [];
    // 데이터에서 해당 월에 해당하는 것들을 찾아옴
    const filteredData = schedules.filter((item) => {
        
        const itemDate = item.scheduleDate

        const koreanItemDate = new Date(itemDate.getTime() + 9 * 60 * 60 * 1000);
        if (koreanItemDate.getMonth() + 1 == month) { //해당 월과 스케줄이 일치하면
            scheduleList.push(item)
        } else {
            return
        }
    }); 

    return scheduleList
}