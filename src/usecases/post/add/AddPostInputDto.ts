import User from '../../../domain/user/entities/User';

export default class AddPostInputDto {

    title: string;
    author: User;
    content: string;
    date: string;

    constructor(
        title: string,
        author: User,
        content: string,
        date: string
    ) {
        this.title = title;
        this.author = author;
        this.content = content;
        this.date = date;
    }

}
