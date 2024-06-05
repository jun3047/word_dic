export default async function getWordDB() {
    console.log(process.env.NEXT_PUBLIC_BASE_URL + '/api/getWordDB');
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/getWordDB');
    const result: Record<string, Expression[]> = await response.json();

    return result;
}