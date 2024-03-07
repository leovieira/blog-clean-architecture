import User from '../entities/User';

export default interface UserGateway {
    save(user: User): Promise<User>;
    findByNickname(nickname: string): Promise<User>;
}
