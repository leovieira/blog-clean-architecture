export default class AddUserOutputDto {

    id: string;
    name: string;
    email: string;
    nickname: string;

    constructor(
        id: string,
        name: string,
        email: string,
        nickname: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
    }

}
