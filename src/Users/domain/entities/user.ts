import { DashboardApply } from "src/Dashboard/domain/entities/dashboard.apply";
import { DashboardSchedule } from "src/Dashboard/domain/entities/dashboard.schedule";
import { DashboardNotes } from "src/Dashboard/domain/entities/dashboard.notes";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

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

    @ApiProperty({ example: 1, description: '유저 고유아이디' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '센트', description: '유저 이름' })
    @Column()
    name: string;

    @ApiProperty({ example: 'sss@sss.com', description: '유저 이메일' })
    @Column()
    email: string;

    @ApiProperty({ example: '센트리', description: '유저 별명' })
    @Column({ name: 'nick_name' })
    nickName: string;

    @ApiProperty({ example: 'Archived', description: '유저 상태' })
    @Column({ type: 'enum', name: 'user_status', enum: UserStatus })
    userStatus: UserStatus;

    @ApiProperty({ example: 'dwkodw', description: '유저 비밀번호 해시값' })
    @Column({ nullable: true })
    password: string;

    @ApiProperty({ example: 'Google', description: '유저 가입 유형' })
    @Column({type: 'enum', name: 'user_type', enum: UserType})
    userType: UserType;


    //apply
    @OneToMany(
        (type) => DashboardApply,
        (apply) => apply.user, { cascade: true, lazy: true }
    )
    applies!: Promise<DashboardApply[]>;

    //calendar
    @OneToMany(
        (type) => DashboardSchedule,
        (schedule) => schedule.user, { cascade: true, lazy: true }
    )
    schedules!: Promise<DashboardSchedule[]>;

    @OneToMany(
        (type) => DashboardNotes,
        (note) => note.user, { cascade: true, lazy: true }
    )
    notes!: Promise<DashboardNotes[]>;
}