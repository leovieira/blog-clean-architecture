import Post from '../../../domain/post/entities/Post';
import PostGateway from '../../../domain/post/gateway/PostGateway';
import Usecase from '../../Usecase';
import ListPostInputDto from './ListPostInputDto';
import ListPostOutputDto from './ListPostOutputDto';
import PostDto from './PostDto';
import UserDto from './UserDto';

export default class ListPostUsecase implements Usecase<ListPostInputDto, ListPostOutputDto> {

    private postGateway: PostGateway;

    private constructor(postGateway: PostGateway) {
        this.postGateway = postGateway;
    }

    static create(postGateway: PostGateway) {
        return new ListPostUsecase(postGateway);
    }

    async execute(input: ListPostInputDto): Promise<ListPostOutputDto> {
        if (input.author) {
            var posts = await this.postGateway.listByAuthor(input.author);
        } else {
            var posts = await this.postGateway.list();
        }

        const postsDto = this.createOutput(posts);
        return new ListPostOutputDto(postsDto);
    }

    private createOutput(posts: Array<Post>): Array<PostDto> {
        var postsDto = new Array<PostDto>();

        for (let p of posts) {
            var user = p.getAuthor();
            var userDto = new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getNickname()
            );

            postsDto.push(new PostDto(p.getId(), p.getTitle(), userDto, p.getContent(), p.getDate()));
        }

        return postsDto;
    }

}
