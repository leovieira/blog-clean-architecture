import { PrismaClient } from '@prisma/client';

import User from "../../../domain/user/entities/User";
import UserGateway from '../../../domain/user/gateway/UserGateway';

const prisma = new PrismaClient();

export default class UserRepository implements UserGateway {

    async save(user: User): Promise<User> {
        const rs = await prisma.user.create({
            data: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickname(),
                password: user.getPassword()
            }
        });

        const newUser = User.with(
            rs.id,
            rs.name,
            rs.email,
            rs.nickname,
            rs.password
        );

        return newUser;
    }

    async findByNickname(nickname: string): Promise<User> {
        const rs = await prisma.user.findUniqueOrThrow({
            where: {
                nickname
            }
        });

        const newUser = User.with(
            rs.id,
            rs.name,
            rs.email,
            rs.nickname,
            rs.password
        );

        return newUser;
    }

}
