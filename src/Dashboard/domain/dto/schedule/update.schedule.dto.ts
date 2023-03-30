import { ApiProperty } from "@nestjs/swagger";


export class UpdateScheduleDTO {
    @ApiProperty({ example: 1, description: '유저 스케줄 고유 아이디' })
    scheduleId: number;
    
    @ApiProperty({ example: null, description: '유저 스케줄 제목' })
    title?: string;

    @ApiProperty({ example: null, description: '유저 스케줄 날짜' })
    scheduleDate?: number;

    @ApiProperty({ example: null, description: '유저 스케줄 설명' })
    description?: string;

    @ApiProperty({ example: null, description: '유저 스케줄 타입' })
    scheduleType?: string;
}