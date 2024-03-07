import Usecase from '../../Usecase';
import AddPostUserInputDto from './AddPostUserInputDto';
import AddPostUserOutputDto from './AddPostUserOutputDto';
import PostGateway from '../../../domain/post/gateway/PostGateway';
import UserGateway from '../../../domain/user/gateway/UserGateway';
import User from '../../../domain/post/entities/User';

class AddPostUserUsecase implements Usecase<AddPostUserInputDto, AddPostUserOutputDto> {

    private postGateway: PostGateway;
    private userGateway: UserGateway;

    private constructor(postGateway: PostGateway, userGateway: UserGateway) {
        this.postGateway = postGateway;
        this.userGateway = userGateway;
    }

    create(postGateway: PostGateway, userGateway: UserGateway): AddPostUserUsecase {
        return new AddPostUserUsecase(postGateway, userGateway);
    }

    execute(input: AddPostUserInputDto): AddPostUserOutputDto {
        var user = this.userGateway.find(input.userId);

        if (user == null) {
            throw new NotfoundException("User" + input.userId + " not found while adding to post.");
        }

        var post = this.postGateway.find(input.postId);

        if (post == null) {
            throw new NotfoundException("Post" + input.postId + " not found while adding user.");
        }

        var postUser = User.with(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getNickname(),
            user.getPassword()
        );

        post.addAuthor(postUser)

        this.postGateway.save(post);

        return new AddPostUserOutputDto(
            post.getId()
        );
    }

}
