interface Expression {
    뜻: string;
    소속: string;
    text: string;
    친숙성: string;
    강도: string;
    img: string;
    type: string;
    예문: string[];
    예문_text: string[];
}

interface ExpressionData {
    [key: string]: Expression[];
}

declare module '@/app/data/기본표현.json' {
    const value: ExpressionData;
    export default value;
}