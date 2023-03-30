import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDTO {
    @ApiProperty({ example: '센트', description: '유저 이름' })
    name: string;

    @ApiProperty({ example: 'sss@sss.com', description: '유저 이메일' })
    email: string;

    @ApiProperty({ example: '센트리', description: '유저 별명' })
    nickName: string;

    @ApiProperty({ example: 'dwkodw', description: '유저 설정할 비밀번호' })
    password: string;

    @ApiProperty({ example: 'Google', description: '인증 시 받은 임시 비밀번호' })
    tempPassword: string;
}
