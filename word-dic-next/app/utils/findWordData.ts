const EMPTY_EXPRESSION: Expression = {
    뜻: "",
    소속: "",
    text: "",
    친숙성: "",
    강도: "",
    img: "",
    type: "",
    예문: [],
    예문_text: []
};

export const findWordData = (word: string, db: Record<string, Expression[]>): FindWordDataResult => {
    for (const key in db) {
        const list = db[key];
        const found = list.find((item) => item.text === word);

        if (found) return {
            wordData: found,
            유사표현List: list
        };
    }

    return {
        wordData: EMPTY_EXPRESSION,
        유사표현List: []
    };
};