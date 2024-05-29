const fs = require('fs');

const tsvFilename = '434.tsv';

const jsonFilename = '기본표현.json';

const filterWord = (word) => word.replace('\r', '')

// TSV 파일 읽기
fs.readFile(tsvFilename, 'utf8', (err, data) => {
    if (err) {
        console.error('파일을 읽을 수 없습니다.', err);
        return;
    }

    // TSV 데이터 파싱
    const rows = data.split('\n').map(row => row.split('\t'));

    // 헤더 제거
    const headers = rows.shift();

    // JSON 객체 초기화
    const tsvJsonData = {};

    // 각 행의 데이터 파싱 및 JSON 객체에 저장
    rows.forEach(row => {
        const word = row[0];
        const examples = [];
        const variations = [];
        for (let i = 1; i < row.length; i += 2) {
            const example = row[i];
            const variation = row[i + 1];
            if (example && variation) {
                examples.push(example);
                variations.push(filterWord(variation));
            }
        }
        tsvJsonData[word] = {
            'text': word,
            '예문': examples,
            '예문_text': variations
        };
    });

    // 기존 JSON 파일 읽기
    fs.readFile(jsonFilename, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽을 수 없습니다.', err);
            return;
        }
        
        const jsonData = JSON.parse(data);
    
        // JSON 데이터 수정
        Object.keys(jsonData).forEach(jsonItemKey => {
            jsonData[jsonItemKey].forEach((jsonItem, i) => {
                const foundItem = Object.entries(tsvJsonData).find(([key, value]) => value.text === jsonItem.text);
                if (foundItem) {
                    jsonData[jsonItemKey][i]['예문'] = foundItem[1]['예문'];
                    jsonData[jsonItemKey][i]['예문_text'] = foundItem[1]['예문_text'];
                }
            });
        });
    
        // 수정된 JSON 데이터를 파일로 저장
        fs.writeFile('new_Data.json', JSON.stringify(jsonData), 'utf8', (err) => {
            if (err) {
                console.error('파일을 저장할 수 없습니다.', err);
                return;
            }
            console.log('JSON 파일로 변환 및 저장 완료');
        });
    });    
});