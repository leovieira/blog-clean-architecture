import Usecase from '../../Usecase';
import AddPostInputDto from './AddPostInputDto';
import AddPostOutputDto from './AddPostOutputDto';
import PostGateway from '../../../domain/post/gateway/PostGateway';
import Post from '../../../domain/post/entities/Post';
import UserRepository from '../../../infra/repositories/user/UserRepository';
import User from '../../../domain/post/entities/User';
import UserDto from './UserDto';

export default class AddPostUsecase implements Usecase<AddPostInputDto, AddPostOutputDto> {

    private postGateway: PostGateway;

    private constructor(postGateway: PostGateway) {
        this.postGateway = postGateway;
    }

    static create(gateway: PostGateway): AddPostUsecase {
        return new AddPostUsecase(gateway);
    }

    async execute(input: AddPostInputDto): Promise<AddPostOutputDto> {
        const userRepo = new UserRepository;
        const user = await userRepo.findByNickname(input.author);

        if (user == null) {
            throw new NotfoundException("User not found");
        }

        const postUser = User.with(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getNickname(),
            user.getPassword(),
        )

        const post = Post.create(
            input.title,
            postUser,
            input.content
        );

        const newPost = await this.postGateway.save(post);

        const userDto = new UserDto(
            postUser.getId(),
            postUser.getName(),
            postUser.getEmail(),
            postUser.getNickname()
        );

        return new AddPostOutputDto(
            newPost.getId(),
            newPost.getTitle(),
            userDto,
            newPost.getContent(),
            newPost.getDate()
        );
    }

}
