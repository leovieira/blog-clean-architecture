import Post from '../../post/entities/Post';
import Policy from '../../shared/policies/Policy';
import DomainException from '../../shared/exceptions/DomainException';

export default class PostPolicy implements Policy<Post>{

    static isAccording(entity: Post): void {
        new PostPolicy().validate(entity);
    }

    validate(entity: Post): void {
        if (entity.getTitle().length > 50) {
            throw new DomainException("Post title must be less then 50");
        }

        if (entity.getContent().length > 250) {
            throw new DomainException("Post content must be less then 250");
        }

        // todo
        if (entity.getAuthor() == null) {
            throw new DomainException("Post author must be registered");
        }
    }
    
}
