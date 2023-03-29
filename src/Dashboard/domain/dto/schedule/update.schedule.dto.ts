import { Long } from "typeorm";

export class UpdateScheduleDTO {
    scheduleId: number;
    
    title?: string;

    scheduleDate?: number;

    description?: string;

    scheduleType?: string;
}