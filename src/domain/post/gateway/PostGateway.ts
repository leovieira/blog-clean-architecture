import Post from '../entities/Post';

export default interface PostGateway {
    save(post: Post): void;
    find(id: string): Post;
    list(): Array<Post>;
    listByAuthor(id: string): Array<Post>;
}
