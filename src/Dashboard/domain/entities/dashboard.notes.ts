import { User } from "src/Users/domain/entities/user";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('dashboard_notes')
export class DashboardNotes { //유저의 대시보드 id = email을 참조
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ name: 'note_content' })
    noteContent: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Timestamp

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Timestamp

    @ManyToOne(
        (type) => User,
        (user) => user.notes, {nullable: true, onDelete: 'CASCADE'}
    )
    user: User;
}