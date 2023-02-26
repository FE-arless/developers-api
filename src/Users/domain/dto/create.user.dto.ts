import { UserStatus } from "../../domain/entities/user";


export class CreateUserDTO {
    name: string;

    email: string;

    nickName: string;

    userStatus?: UserStatus;
}

