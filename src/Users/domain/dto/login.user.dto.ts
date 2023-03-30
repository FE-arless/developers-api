import { ApiProperty } from "@nestjs/swagger";


export class LoginUserDTO {
    @ApiProperty({ example: 'sss@sss.com', description: '유저 이메일' })
    email: string;

    @ApiProperty({ example: 'dwkodw', description: '유저 비밀번호' })
    password: string;
}
