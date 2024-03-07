import Post from '../entities/Post';

export default interface PostGateway {
    save(post: Post): Promise<Post>;
    find(id: string): Promise<Post>;
    list(): Promise<Array<Post>>;
    listByAuthor(nickname: string | undefined | null): Promise<Array<Post>>;
}
