import { ApiProperty } from "@nestjs/swagger";

export class ResetUserPasswordDTO {
    @ApiProperty({ example: "sss@sss.com", description: '유저 이메일' })
    email: string;

    @ApiProperty({ example: "123456", description: '유저 비밀번호' })
    password: string;

    @ApiProperty({ example: "ssssss", description: '유저 임시로 받은 비밀번호' })
    tempPassword: string;
}