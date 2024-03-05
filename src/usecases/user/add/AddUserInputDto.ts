export default class AddUserInputDto {

    name: string;
    email: string;
    nickname: string;
    password: string;

    constructor(
        name: string,
        email: string,
        nickname: string,
        password: string
    ) {
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

}
