import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public', '기본표현.json');
        const jsonData = await fs.readFile(filePath, 'utf8'); // 비동기 작업, 이벤트 루프는 차단되지 않음
        const 기본표현 = JSON.parse(jsonData);

        return NextResponse.json(기본표현, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
