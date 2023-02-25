import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    nickName: string;

    @Column()
    userStatus: typeof UserStatus;
}

export const UserStatus = {
    Archived:'Archived',
    Invited: 'Invited'
} as const;