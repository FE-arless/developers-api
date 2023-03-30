import { ApiProperty } from "@nestjs/swagger";


export class UpdateResumeDTO {
    @ApiProperty({ example: null, description: '유저 이력서 스킬셋' })
    skills?: string;

    @ApiProperty({ example: null, description: '유저 이력서 경력' })
    career?: string;

    @ApiProperty({ example: null, description: '유저 이력서 학력' })
    education?: string;

    @ApiProperty({ example: null, description: '유저 이력서 제목' })
    title?: string;
}