export default class ListPostInputDto {

    author: string | null | undefined;

    constructor(
        author: string | null | undefined
    ) {
        this.author = author;
    }

}
