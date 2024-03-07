import { Request, Response } from "express";

import ListPostInputDto from "../../../usecases/post/list/ListPostInputDto";
import ListPostUsecase from "../../../usecases/post/list/ListPostUsecase";
import FindPostUsecase from "../../../usecases/post/find/FindPostUsecase";
import ListPostResponseDto from "./dtos/list/ListPostResponseDto";
import PostGateway from "../../../domain/post/gateway/PostGateway";
import PostRepository from "../../repositories/post/PostRepository";
import FindPostInputDto from "../../../usecases/post/find/FindPostInputDto";
import FindPostResponseDto from "./dtos/find/FindPostResponseDto";
import AddPostRequestDto from "./dtos/add/AddPostRequestDto";
import AddPostResponseDto from "./dtos/add/AddPostResponseDto";
import AddPostInputDto from "../../../usecases/post/add/AddPostInputDto";
import AddPostUsecase from "../../../usecases/post/add/AddPostUsecase";

// create request dto with params

export default class PostController {

    async add(req: Request<any, any, AddPostRequestDto>, res: Response) {
        const input = new AddPostInputDto(
            req.body.title,
            req.body.author,
            req.body.content
        );

        const gateway: PostGateway = new PostRepository;
        const output = await AddPostUsecase.create(gateway).execute(input);

        const data: AddPostResponseDto = {
            id: output.id,
            title: output.title,
            author: output.author.nickname,
            content: output.content,
            date: output.date
        };

        res.status(201).json(data);
    }

    async list(req: Request, res: Response) {
        const input = new ListPostInputDto(req.query.author as string);
        const gateway: PostGateway = new PostRepository();
        const output = await ListPostUsecase.create(gateway).execute(input);

        const data: ListPostResponseDto = {
            results: []
        };

        output.posts.forEach((post) => {
            data.results.push({
                id: post.id,
                title: post.title,
                author: post.author.nickname,
                content: post.content,
                date: post.date
            });
        });

        return res.status(200).json(data);
    }

    async find(req: Request, res: Response) {
        const input = new FindPostInputDto(req.params.id);
        const gateway: PostGateway = new PostRepository();
        const output = await FindPostUsecase.create(gateway).execute(input);

        const data: FindPostResponseDto = {
            id: output.id,
            title: output.title,
            author: output.author.nickname,
            content: output.content,
            date: output.date
        };

        return res.status(200).json(data);
    }

}
