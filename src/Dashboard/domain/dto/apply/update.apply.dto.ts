import { ApiProperty } from "@nestjs/swagger";

export class UpdateApplyDTO {

    @ApiProperty({ example: 1, description: '유저 지원현황 고유 아이디' })
    id: number;
    
    @ApiProperty({ example: 'Dropped', description: '유저 지원전형의 상태' })
    status: string;

    @ApiProperty({ example: 'null', description: '유저가 지원한 포지션 연봉' })
    salary?: string;

    @ApiProperty({ example: 'null', description: '지원한 포지션 관련 주소' })
    jobPostUrl?: string;
}