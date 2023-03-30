import { ApiProperty } from "@nestjs/swagger";

export class CreateResumeDTO {
    @ApiProperty({ example: null, description: '유저 이력서 스킬셋' })
    skills?: string;

    @ApiProperty({ example: null, description: '유저 이력서 경력' })
    career?: string;

    @ApiProperty({ example: null, description: '유저 이력서 학력' })
    education?: string;

    @ApiProperty({ example: "센트의 이력서", description: '유저 이력서 제목' })
    title: string;

    @ApiProperty({ example: "sss@sss.com", description: '유저 이메일' })
    userEmail: string;
}