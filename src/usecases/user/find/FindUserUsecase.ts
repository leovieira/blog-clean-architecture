import Usecase from '../../Usecase';
import FindUserInputDto from './FindUserInputDto';
import FindUserOutputDto from './FindUserOutputDto';
import UserGateway from '../../../domain/user/gateway/UserGateway';

class FindUserUsecase implements Usecase<FindUserInputDto, FindUserOutputDto> {

    private userGateway: UserGateway;

    private constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }

    create(gateway: UserGateway): FindUserUsecase {
        return new FindUserUsecase(gateway);
    }

    execute(input: FindUserInputDto): FindUserOutputDto {
        var user = this.userGateway.find(input.id);

        if (user == null) {
            throw new NotfoundException("User not found");
        }

        return new FindUserOutputDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getNickname(),
            user.getPassword()
        );
    }

}
