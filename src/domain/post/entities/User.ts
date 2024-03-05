import Entity from "../../shared/entities/Entity";

class User extends Entity {

    private nickname: string;

    private constructor(id: string, nickname: string) {
        super(id);
        this.nickname = nickname;
        this.validate();
    }

    static with(id: string, nickname: string): User {
        return new User(id, nickname);
    }

    getNickname(): string {
        return this.nickname;
    }

    protected validate(): void {
        if (this.getId() == "") {
            throw new DomainException("User id is required");
        }

        if (this.nickname == "") {
            throw new DomainException("User nickname is required");
        }
    }

}
