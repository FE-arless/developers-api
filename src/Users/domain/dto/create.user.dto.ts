import { UserStatus } from "../../domain/entities/User";


export class CreateUserDTO {
    name: string;

    email: string;

    nickName: string;

    userStatus?: UserStatus;
}

