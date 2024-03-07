import Usecase from '../../Usecase';
import AddUserInputDto from './AddUserInputDto';
import AddUserOutputDto from './AddUserOutputDto';
import UserGateway from '../../../domain/user/gateway/UserGateway';
import User from '../../../domain/user/entities/User';

export default class AddUserUsecase implements Usecase<AddUserInputDto, AddUserOutputDto> {

    private userGateway: UserGateway;

    private constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }

    static create(gateway: UserGateway): AddUserUsecase {
        return new AddUserUsecase(gateway);
    }

    async execute(input: AddUserInputDto): Promise<AddUserOutputDto> {
        const user = User.create(
            input.name,
            input.email,
            input.nickname,
            input.password
        );

        const newUser = await this.userGateway.save(user);

        return new AddUserOutputDto(
            newUser.getId(),
            newUser.getName(),
            newUser.getEmail(),
            newUser.getNickname()
        );
    }
    
}
