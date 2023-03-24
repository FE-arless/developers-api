import { DashboardApply } from "src/Dashboard/domain/entities/dashboard.apply";
import { DashboardSchedule } from "src/Dashboard/domain/entities/dashboard.schedule";
import { DashboardNotes } from "src/Dashboard/domain/entities/dashboard.notes";
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, OneToMany } from "typeorm";

export enum UserStatus {
    Archived ='Archived',
    Invited = 'Invited',
    Verified = 'Verified',
}

export enum UserType {
    Google = 'Google',
    Email = 'Email'
}

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ name: 'nick_name' })
    nickName: string;

    @Column({ type: 'enum', name: 'user_status', enum: UserStatus })
    userStatus: UserStatus;

    @Column({ nullable: true })
    password: string;

    @Column({type: 'enum', name: 'user_type', enum: UserType})
    userType: UserType;


    //apply
    @OneToMany(
        (type) => DashboardApply,
        (apply) => apply.user,
    )
    applies!: DashboardApply[];

    //calendar
    @OneToMany(
        (type) => DashboardSchedule,
        (schedule) => schedule.user,
    )
    schedules!: DashboardSchedule[];

    //notes
    @OneToMany(
        (type) => DashboardNotes,
        (note) => note.user,
    )
    notes!: DashboardNotes[];
}