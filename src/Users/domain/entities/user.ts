import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

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
}