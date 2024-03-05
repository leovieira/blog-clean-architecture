export default interface Policy<T> {
    validate(entity: T): void;
}
