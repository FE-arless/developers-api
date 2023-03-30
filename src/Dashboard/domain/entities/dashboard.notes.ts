import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/Users/domain/entities/user";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('dashboard_notes')
export class DashboardNotes { //유저의 대시보드 id = email을 참조

    @ApiProperty({ example: 1, description: '유저 노트 고유 아이디' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "센트의 노트", description: '유저 노트 제목' })
    @Column()
    title: string;

    @ApiProperty({ example: "?", description: '유저 노트 내용' })
    @Column({ name: 'note_content' })
    noteContent: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Timestamp

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Timestamp

    @ManyToOne(
        (type) => User,
        (user) => user.notes, { nullable: true, onDelete: 'CASCADE' }
    )
    user: User
}