export default class FindUserOutputDto {

    id: string;
    name: string;
    email: string;
    nickname: string;
    password: string;

    constructor(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

}
