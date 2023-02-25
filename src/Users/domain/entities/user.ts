import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum UserStatus {
    Archived ='Archived',
    Invited = 'Invited'
}

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ name: "nick_name" })
    nickName: string;

    @Column({ type: 'enum', name: 'user_status', enum: UserStatus })
    userStatus: UserStatus;
}

