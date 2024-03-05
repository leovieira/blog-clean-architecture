import User from '../../../domain/user/entities/User';

export default class AddPostOutputDto {

    id: string;
    title: string;
    author: User;
    content: string;
    date: string;

    constructor(
        id: string,
        title: string,
        author: User,
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
