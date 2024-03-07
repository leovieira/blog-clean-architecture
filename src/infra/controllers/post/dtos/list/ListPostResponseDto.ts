export default interface ListPostResponseDto {
    results: Array<{
        id: string;
        title: string;
        author: string;
        content: string;
        date: string;
    }>;
}
