import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduleDTO {
    @ApiProperty({ example: '점심 약속', description: '유저 스케줄 제목' })
    title: string;

    @ApiProperty({ example: new Date(), description: '유저 스케줄 날짜' })
    scheduleDate: number;

    @ApiProperty({ example: null, description: '유저 스케줄 설명' })
    description?: string;

    @ApiProperty({ example: 'Meeting', description: '유저 스케줄 타입' })
    scheduleType: string;
}