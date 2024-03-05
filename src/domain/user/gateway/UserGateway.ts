import User from '../entities/User';

export default interface UserGateway {
    save(user: User): void;
    find(id: string): User;
}
