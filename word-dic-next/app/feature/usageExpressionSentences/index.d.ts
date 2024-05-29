interface IExampleSection {
    mean: string,
    paginatedList: string[][],
    소속: string,
    page: number,
}

interface UseSentencePaginationResult {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    paginatedList: string[][];
}