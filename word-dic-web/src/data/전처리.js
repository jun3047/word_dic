//기본 표현.json에서 키가"text"인 갓민 가져와서 txt로 저장

const fs = require('fs');
const path = require('path');
const data = require('./기본표현.json');


const json2text = () => {
    
    let txt = '';

    Object.values(data).forEach((item) => {
        item.forEach((_item) => {
            if (_item.text) {
                txt += _item.text + '\n';
            }
        });
    });

    fs.writeFileSync(path.join(__dirname, '전처리.txt'), txt, 'utf-8');
}

json2text();

    // //월

    // '기쁘다': '행복하다',
    // '신나다': '행복하다',
    // '좋다': '행복하다',
    // '행복하다': '행복하다',

    // //화

    // '감동하다': '감동하다',
    // '부럽다': '감동하다',
    // '반하다': '감동하다',
    // '선호하다': '감동하다',
    // '애틋하다': '감동하다',

    // '안정되다': '편안하다',
    // '편안하다': '편안하다',
    // '만족하다': '편안하다',
    // '공감하다': '편안하다',
    // '후련하다': '편안하다',

    // //수

    // '심심하다': '지루하다',
    // '지루하다': '지루하다',

    // '미안하다': '슬프다',
    // '눈물겹다': '슬프다',
    // '서운하다': '슬프다',
    // '억울하다': '슬프다',
    // '슬프다': '슬프다',
    // '외롭다': '슬프다',
    // '우울하다': '슬프다',
    // '아쉽다': '슬프다',
    // '실망하다': '슬프다',
    // '후회하다': '슬프다',
    // '그립다': '슬프다',

    // //목

    // '놀라다': '무섭다',
    // '무섭다': '무섭다',
    // '불쾌하다': '무섭다',
    // '조마조마하다': '무섭다',

    // '증오하다': '화나다',
    // '화나다': '화나다',

    // '우습다': '싫다',
    // '부끄럽다': '싫다',
    // '불편하다': '싫다',
    // '괴롭다': '싫다',
    // '귀찮다': '싫다',
    // '싫다': '싫다',
    // '짜증내다': '싫다'