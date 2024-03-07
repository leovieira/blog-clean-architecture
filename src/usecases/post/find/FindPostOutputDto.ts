import UserDto from "./UserDto";

export default class FindPostOutputDto {

    id: string;
    title: string;
    author: UserDto;
    content: string;
    date: string;

    constructor(
        id: string,
        title: string,
        author: UserDto,
        content: string,
        date: string
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.date = date;
    }

}
