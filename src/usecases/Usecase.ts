export default interface Usecase<InputDto, OutputDto> {
    execute(input: InputDto): OutputDto;
}
