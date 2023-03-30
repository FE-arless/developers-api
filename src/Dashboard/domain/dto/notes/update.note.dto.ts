import { ApiProperty } from "@nestjs/swagger";

export class UpdateNoteDTO {
    @ApiProperty({ example: 1, description: '유저 노트 고유 아이디' })
    id: number;
    
    @ApiProperty({ example: "센트의 노트", description: '유저 노트 제목' })
    title: string;

    @ApiProperty({ example: "?", description: '유저 노트 내용' })
    noteContent: string;
}