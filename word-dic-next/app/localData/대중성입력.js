const fs = require('fs');

const allDataFilename = '434AllData.csv';
const jsonFilename = '기본표현.json';

// 단어의 오탈자를 수정한 경우 수동으로 입력해줘야 함

// TSV 파일 읽기
fs.readFile(allDataFilename, 'utf8', (err, data) => {
    if (err) {
        console.error('파일을 읽을 수 없습니다.', err);
        return;
    }

    // TSV 데이터 파싱
    const rows = data.split('\n').map(row => row.split(';'));

    // 헤더 제거
    const headers = rows.shift();

    // JSON 객체 초기화
    const allJsonData = {};

    // 각 행의 데이터 파싱 및 JSON 객체에 저장
    rows.forEach(row => {
        const word = row[0];
        const strong = row[4];
        const friend = row[2];
        allJsonData[word] = {
            'text': word,
            '강도': strong,
            '친숙성': friend
        };
    });

    // 기존 JSON 파일 읽기
    fs.readFile(jsonFilename, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽을 수 없습니다.', err);
            return;
        }
        
        const jsonData = JSON.parse(data);
    
        Object.keys(jsonData).forEach(jsonItemKey => {
            jsonData[jsonItemKey].forEach((jsonItem, i) => {
                const foundItem = Object.entries(allJsonData).find(([key, value]) => value.text === jsonItem.text);
                if (foundItem) {
                    jsonData[jsonItemKey][i]['친숙성'] = foundItem[1]['친숙성'];
                    jsonData[jsonItemKey][i]['강도'] = foundItem[1]['강도'];
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