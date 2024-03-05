import Usecase from '../../Usecase';
import AddUserInputDto from './AddUserInputDto';
import AddUserOutputDto from './AddUserOutputDto';
import UserGateway from '../../../domain/user/gateway/UserGateway';
import User from '../../../domain/user/entities/User';

class AddUserUsecase implements Usecase<AddUserInputDto, AddUserOutputDto> {

    private userGateway: UserGateway;

    private constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }

    create(gateway: UserGateway): AddUserUsecase {
        return new AddUserUsecase(gateway);
    }

    execute(input: AddUserInputDto): AddUserOutputDto {
        var user = User.create(
            input.name,
            input.email,
            input.nickname,
            input.password
        );

        this.userGateway.save(user);

        return new AddUserOutputDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getNickname(),
            user.getPassword()
        );
    }
    
}
