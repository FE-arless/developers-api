import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserInfoDTO {
    @ApiProperty({ example: null, description: '유저 이름' })
    name?: string;

    @ApiProperty({ example: null, description: '유저 별명' })
    nickName?: string;
}