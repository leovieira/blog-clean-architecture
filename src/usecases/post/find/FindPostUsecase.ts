import Usecase from '../../Usecase';
import FindPostInputDto from './FindPostInputDto';
import FindPostOutputDto from './FindPostOutputDto';
import PostGateway from '../../../domain/post/gateway/PostGateway';
import UserDto from './UserDto';

export default class FindUserUsecase implements Usecase<FindPostInputDto, FindPostOutputDto> {

    private postGateway: PostGateway;

    private constructor(postGateway: PostGateway) {
        this.postGateway = postGateway;
    }

    static create(gateway: PostGateway): FindUserUsecase {
        return new FindUserUsecase(gateway);
    }

    async execute(input: FindPostInputDto): Promise<FindPostOutputDto> {
        const post = await this.postGateway.find(input.id);

        if (post == null) {
            throw new NotfoundException("Post not found");
        }

        const user = post.getAuthor()
        const userDto = new UserDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getNickname()
        );

        return new FindPostOutputDto(
            post.getId(),
            post.getTitle(),
            userDto,
            post.getContent(),
            post.getDate()
        );
    }

}
