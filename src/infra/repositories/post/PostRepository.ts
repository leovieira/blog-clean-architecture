import { PrismaClient } from '@prisma/client';

import Post from "../../../domain/post/entities/Post";
import PostGateway from '../../../domain/post/gateway/PostGateway';
import User from '../../../domain/post/entities/User';

const prisma = new PrismaClient();

export default class PostRepository implements PostGateway {

    async save(post: Post): Promise<Post> {
        const rs = await prisma.post.create({
            data: {
                id: post.getId(),
                title: post.getTitle(),
                authorId: post.getAuthor().getId(),
                content: post.getContent(),
                date: post.getDate()
            }
        });

        const newPost = Post.with(
            rs.id,
            rs.title,
            post.getAuthor(), // todo: create a user
            rs.content,
            rs.date
        );

        return newPost;
    }

    async list(): Promise<Array<Post>> {
        const rs = await prisma.post.findMany({
            include: {
                author: true
            }
        });

        const posts = rs.map((item) => {
            var author = User.with(
                item.author.id,
                item.author.name,
                item.author.email,
                item.author.nickname,
                item.author.password
            );

            var post = Post.with(
                item.id,
                item.title,
                author,
                item.content,
                item.date,
            );

            return post;
        });

        return posts;
    }

    async listByAuthor(nickname: string): Promise<Array<Post>> {
        const rs = await prisma.user.findUniqueOrThrow({
            include: {
                posts: true
            },
            where: {
                nickname
            }
        });

        const author = User.with(
            rs.id,
            rs.name,
            rs.email,
            rs.nickname,
            rs.password
        );

        const posts = rs.posts.map((item) => {
            return Post.with(
                item.id,
                item.title,
                author,
                item.content,
                item.date,
            );
        });

        return posts;
    }

    async find(id: string): Promise<Post> {
        const rs = await prisma.post.findUniqueOrThrow({
            include: {
                author: true
            },
            where: {
                id
            }
        });

        const author = User.with(
            rs.author.id,
            rs.author.name,
            rs.author.email,
            rs.author.nickname,
            rs.author.password
        );

        const post = Post.with(
            rs.id,
            rs.title,
            author,
            rs.content,
            rs.date
        );

        return post;
    }

}
