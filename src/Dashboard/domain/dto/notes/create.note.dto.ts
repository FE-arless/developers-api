import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDTO {
    @ApiProperty({ example: "센트의 노트", description: '유저 노트 제목' })
    title: string;

    @ApiProperty({ example: "?", description: '유저 노트 내용' })
    noteContent: string;
}