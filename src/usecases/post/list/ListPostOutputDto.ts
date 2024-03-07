import PostDto from './PostDto';

export default class ListPostOutputDto {

    posts: Array<PostDto>;

    constructor(
        posts: Array<PostDto>
    ) {
        this.posts = posts;
    }

}
