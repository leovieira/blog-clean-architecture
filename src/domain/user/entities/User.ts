import { v4 as uuidv4 } from 'uuid';

import Entity from '../../shared/entities/Entity';
import AggregatteRoot from '../../shared/aggregatte/AggregatteRoot';

export default class User extends Entity implements AggregatteRoot {

    private name: string;
    private email: string;
    private nickname: string;
    private password: string;

    private constructor(id: string, name: string, email: string, nickname: string, password: string) {
        super(id);
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.password = password;

        this.validate();
    }

    static create(name: string, email: string, nickname: string, password: string): User {
        return new User(
            uuidv4(),
            name,
            email,
            nickname,
            password
        );
    }

    static with(id: string, name: string, email: string, nickname: string, password: string): User {
        return new User(
            id,
            name,
            email,
            nickname,
            password
        );
    }

    protected validate(): void {
        if (this.getId() == "") {
            throw new DomainException("User id is required");
        }

        if (this.name == ""){
            throw new DomainException("User name is required");
        }

        if(this.email == ""){
            throw new DomainException("User email is required");
        }

        if(this.nickname == ""){
            throw new DomainException("User nickname is required");
        }

        if(this.password == ""){
            throw new DomainException("User password is required");
        }

        // EmailPolicy.isAccording(this);
        // NicknamePolicy.isAccording(this);
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getNickname(): string {
        return this.nickname;
    }

    getPassword(): string {
        return this.password;
    }

}
