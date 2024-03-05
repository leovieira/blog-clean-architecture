export default class AddPostUserInputDto {

    postId: string;
    userId: string;

    constructor(
        postId: string,
        userId: string
    ) {
        this.postId = postId;
        this.userId = userId;
    }

}
