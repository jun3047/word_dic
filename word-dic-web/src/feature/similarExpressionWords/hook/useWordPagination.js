import { useState, useMemo, useEffect } from 'react';
import { WORO_BOX_SIZE } from 'data/constant';

const useWordPagination = (items) => {
    const [page, setPage] = useState(1);

    const paginatedList = useMemo(() => {
        const start = (page - 1) * WORO_BOX_SIZE;
        const end = start + WORO_BOX_SIZE;
        return items.slice(start, end);
    }, [items, page]);

    useEffect(() => {
        setPage(1);
    }, [items]);

    return { page, setPage, paginatedList };
};

export default useWordPagination;