const fs = require('fs');

// CSV 파일 경로
const csvFilename = '434.csv';

// JSON 파일 경로
const jsonFilename = '기본표현.json';

// CSV 파일 읽기
fs.readFile(csvFilename, 'utf8', (err, data) => {
    if (err) {
        console.error('파일을 읽을 수 없습니다.', err);
        return;
    }

    // CSV 데이터 파싱
    const rows = data.split('\n').map(row => row.split(','));

    // 헤더 제거
    const headers = rows.shift();

    // JSON 객체 초기화
    const csvJsonData = {};

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
                variations.push(variation);
            }
        }
        csvJsonData[word] = {
            'text': word,
            '예문': examples,
            '예문_text': variations
        };
    });

    fs.readFile(jsonFilename, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽을 수 없습니다.', err);
            return;
        }
        
        const JsonData = JSON.parse(data)
    
        // Json의 Value를 하나씩 꺼낸다.
        Object.keys(JsonData).forEach(jsonItemKey => {

            JsonData[jsonItemKey].forEach((jsonItem, i)=>{
                    const foundItem = Object.entries(csvJsonData).find(([key, value]) => value.text === jsonItem.text);

                    if(foundItem){
                        console.log("찾는 jsonItem: ", jsonItem)
                        console.log("찾은 foundItem[1]: ", foundItem[1])
                        JsonData[jsonItemKey][i]['예문'] = foundItem[1]['예문']
                        JsonData[jsonItemKey][i]['예문_text'] = foundItem[1]['예문_text']
                    }
            })
        });
    
        fs.writeFile('new_Data.json', JSON.stringify(JsonData), 'utf8', (err) => {
            if (err) {
                console.error('파일을 저장할 수 없습니다.', err);
                return;
            }
            console.log('JSON 파일로 변환 및 저장 완료');
        });
    });    
});

// Json의 Value를 하나씩 꺼낸다.
// Value는 list이고 Value의 요소들을 하나씩 꺼낸다. jsonItem이라고 한다.
// csvJsonData에서 text가 jsonItem.text과 같은 요소를 찾는다.
// jsonItem의 해당 요소의 "예문"과 "예문_text"를 csvJsonData 요소의 값으로 할당한다.
// csvJsonData의 모든 값을 순회하고 수정된 JsonData를 저장한다.