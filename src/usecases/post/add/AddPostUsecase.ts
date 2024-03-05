import Usecase from '../../Usecase';
import AddPostInputDto from './AddPostInputDto';
import AddPostOutputDto from './AddPostOutputDto';
import PostGateway from '../../../domain/post/gateway/PostGateway';
import Post from '../../../domain/post/entities/Post';

class AddPostUsecase implements Usecase<AddPostInputDto, AddPostOutputDto> {

    private postGateway: PostGateway;

    private constructor(postGateway: PostGateway) {
        this.postGateway = postGateway;
    }

    create(gateway: PostGateway): AddPostUsecase {
        return new AddPostUsecase(gateway);
    }

    execute(input: AddPostInputDto): AddPostOutputDto {
        var post = Post.create(
            input.title,
            input.author,
            input.content
        );

        this.postGateway.save(post);

        return new AddPostOutputDto(
            post.getId(),
            post.getTitle(),
            post.getAuthor(),
            post.getContent(),
            post.getDate()
        );
    }

}
