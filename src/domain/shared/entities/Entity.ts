export default abstract class Entity {

    protected id: string;

    protected constructor(id: string) {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    protected abstract validate(): void;

}
