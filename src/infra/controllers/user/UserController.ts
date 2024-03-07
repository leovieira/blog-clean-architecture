import { Request, Response } from "express";

import AddUserInputDto from "../../../usecases/user/add/AddUserInputDto";
import AddUserUsecase from "../../../usecases/user/add/AddUserUsecase";
import AddUserRequestDto from "./dtos/add/AddUserRequestDto";
import AddUserResponseDto from "./dtos/add/AddUserResponseDto";
import UserGateway from "../../../domain/user/gateway/UserGateway";
import UserRepository from "../../repositories/user/UserRepository";

export default class UserController {
    async add(req: Request<any, any, AddUserRequestDto>, res: Response) {
        const input = new AddUserInputDto(
            req.body.name,
            req.body.email,
            req.body.nickname,
            req.body.password
        );

        const gateway: UserGateway = new UserRepository;
        const output = await AddUserUsecase.create(gateway).execute(input);

        const data: AddUserResponseDto = {
            id: output.id,
            name: output.name,
            email: output.email,
            nickname: output.nickname
        };

        res.status(201).json(data);
    }
}
