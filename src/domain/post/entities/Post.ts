import { v4 as uuidv4 } from 'uuid';

import AggregatteRoot from "../../shared/aggregatte/AggregatteRoot";
import Entity from "../../shared/entities/Entity";
import User from './User';
import PostPolicy from '../policies/PostPolicy';
import DomainException from '../../shared/exceptions/DomainException';

export default class Post extends Entity implements AggregatteRoot {

    private title: string;
    private author: User;
    private content: string;
    private date: string;

    private constructor(id: string, title: string, author: User, content: string, date: string) {
        super(id);
        this.title = title;
        this.author = author;
        this.content = content;
        this.date = date;
        this.validate();
    }

    static create(title: string, author: User, content: string) {
        return new Post(
            uuidv4(),
            title,
            author,
            content,
            new Date().toUTCString()
        );
    }

    static with(id: string, title: string, author: User, content: string, date: string) {
        return new Post(
            id,
            title,
            author,
            content,
            date
        );
    }

    protected validate(): void {
        if (this.getId() == "") {
            throw new DomainException("Post id is required");
        }

        if (this.title == "") {
            throw new DomainException("Post title is required");
        }

        if (this.author == null) {
            throw new DomainException("Post author is required");
        }

        if (this.content == "") {
            throw new DomainException("Post content is required");
        }

        if (this.date == "") {
            throw new DomainException("Post date is required");
        }

        PostPolicy.isAccording(this);
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): User {
        return this.author;
    }

    getContent(): string {
        return this.content;
    }

    getDate(): string {
        return this.date;
    }

    addAuthor(author: User): void {
        this.author = author;
    }

}
