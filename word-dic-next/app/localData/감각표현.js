const fs = require('fs');

const tsvFilename = 'new.tsv';
const jsonFilename = '기본표현.json';
const allDataFilename = '434AllData.csv';

const filterWord = (word) => word.replace('\r', '')

let allJsonData = {};

fs.readFile(allDataFilename, 'utf8', (err, allData) => {
    if (err) {
        console.error('파일을 읽을 수 없습니다.', err);
        return;
    }
    const rows = allData.split('\n').map(row => row.split(';'));
    const headers = rows.shift();

    rows.forEach(row => {
        const word = row[0];
        const strong = row[4];
        const friend = row[2];
        allJsonData[word] = {
            '강도': strong,
            '친숙성': friend
        };
    });

    // TSV 파일 읽기
    fs.readFile(tsvFilename, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽을 수 없습니다.', err);
            return;
        }

        const rows = data.split('\n').map(row => row.split('\t'));
        const headers = rows.shift();
        const tsvJsonData = {};

        rows.forEach(row => {
            const word = row[0];
            const 소속 = row[1];
            const 세부소속 = row[2].split(',')[0]; //우선은 첫번째 값만 쓰기

            const examples = [];
            const variations = [];
            for (let i = 3; i < row.length; i += 2) {
                const example = row[i];
                const variation = row[i + 1];
                if (example && variation) {
                    examples.push(example);
                    variations.push(filterWord(variation));
                }
            }

            console.log("allJsonData[세부소속]:", allJsonData[세부소속])
            // or 행동표현,신체감각 / 강도 정렬 생각
            tsvJsonData[word] = {
                "text": word,
                "소속": 소속,
                "세부소속": 세부소속,
                "img": 세부소속,
                // "친숙성": allJsonData[세부소속]['친숙성'],
                // "강도": allJsonData[세부소속]['강도'],
                "type": "신체감각",
                "예문": examples,
                "예문_text": variations
            };
        });

        // 기존 JSON 파일 읽기
        fs.readFile(jsonFilename, 'utf8', (err, data) => {
            if (err) {
                console.error('파일을 읽을 수 없습니다.', err);
                return;
            }
            
            const jsonData = JSON.parse(data);

            for(const tsvItemKey in tsvJsonData){

                const item = tsvJsonData[tsvItemKey];
                const 소속 = item['세부소속'];
                jsonData[소속].push(item);
            }
        
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
})