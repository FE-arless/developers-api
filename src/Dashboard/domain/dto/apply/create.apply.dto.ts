import { ApiProperty } from "@nestjs/swagger";

export class CreateApplyDTO {

    @ApiProperty({ example: '카카오', description: '유저가 지원한 회사이름' })
    companyName: string;

    @ApiProperty({ example: 'Passed', description: '유저 지원전형의 상태' })
    status: string;

    @ApiProperty({ example: 'iOS Engineer', description: '유저가 지원한 개발 포지션' })
    position: string;

    @ApiProperty({ example: 'Junior', description: '유저 자신의 개발 수준' })
    level: string;

    @ApiProperty({ example: 'null', description: '유저가 지원한 포지션 연봉' })
    salary?: string;

    @ApiProperty({ example: 'swift, Rxswift', description: '유저가 지원한 포지션의 기술 스택' })
    teckStack: string;

    @ApiProperty({ example: 'null', description: '지원한 포지션 관련 주소' })
    jobPostUrl?: string;
}