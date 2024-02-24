import React, { useRef } from 'react';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import { Chart, ArcElement} from 'chart.js';

Chart.register(ArcElement);

const doughnutLabelPlugin = {
    id: 'doughnutLabelPlugin',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save(); // 캔버스 상태 저장

        chart.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          meta.data.forEach((element, index) => {

            const text = meta.label.split(',')[index];
            let centerAngle = element.startAngle + (element.endAngle - element.startAngle) / 2;

            const radius = (element.innerRadius + element.outerRadius) / 2;
            const posX = element.x + Math.cos(centerAngle) * radius;
            const posY = element.y + Math.sin(centerAngle) * radius;

            ctx.fillStyle = '#555555';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
                

            if (dataset.data.length === 8) {
                ctx.font = 'bold 1.1rem SUIT'; // 더 굵고 크게
                const text = meta.label.split(',')[index];
                const centerAngle = element.startAngle + (element.endAngle - element.startAngle) / 2;
    
                const radius = (element.innerRadius + element.outerRadius) / 2;
                const posX = element.x + Math.cos(centerAngle) * radius;
                const posY = element.y + Math.sin(centerAngle) * radius;
        
                ctx.fillText(text, posX, posY);
    
            } else {
    
                ctx.font = 'normal 0.8rem SUIT';
                
                ctx.translate(posX, posY);

                if (centerAngle > 1.5) centerAngle -= 3.1;

                ctx.rotate(centerAngle);
                
                ctx.fillText(text, 0, 0);
    
                ctx.rotate(-centerAngle);
                ctx.translate(-posX, -posY);
    
            }

          });
        });
        ctx.restore(); // 캔버스 상태 복원
    }
};
  
Chart.register(doughnutLabelPlugin);

const DoubleDonutChart = ({setWord, emojiName, activeWord}) => {

    const data = DoubleDonutData(activeWord);

  const chartRef = useRef();
  const onClick = (e) => {

    const element = getElementAtEvent(chartRef.current, e)[0]

    if(element?.datasetIndex === undefined) return

    const {datasetIndex, index} = element

    if (datasetIndex === 0) return setWord(data.datasets[datasetIndex].label[0][index])
    setWord(data.datasets[datasetIndex].label[index])
  }

  const options = {
    responsive: true,
    cutout: 95,
    hoverOffset: 15,
    borderWidth: 2,
    animation: {
        duration: 0 // 애니메이션 효과 없애기
      },    
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full max-w-590r max-h-590r">
    <img
        className="absolute w-140r h-140r"
        src={`/emoji/${emojiName}.png`}
        alt="emoji"
    />
    <Doughnut ref={chartRef} onClick={onClick} data={data} options={options} />
    </div>
  );
};

// 저장된 단어 csv 파일을 읽어와서 data를 구성하도록 수정해야 함

const dataLength = 40;

const FirstData = {
    data: [2, 5, 4, 5, 11, 2, 4, 7],
    label: [
        '화나다',
        '감동하다',
        '행복하다',
        '편안하다',
        '슬프다',
        '지루하다',
        '무섭다',
        '싫다',
    ],
    backgroundColor: [
        'rgba(233, 76, 94, 1)',
        'rgba(241, 138, 0, 1)',
        'rgba(252, 220, 63, 1)',
        'rgba(199, 231, 149, 1)',
        'rgba(174, 234, 244, 1)',
        '#5980E5',
        'rgba(198, 154, 204, 1)',
        'rgba(200, 200, 200, 1)',
    ],
    borderWidth: 2,
    hoverBorderColor: [
        'rgba(151, 42, 42, 1)',
        'rgba(185, 92, 52, 1)',
        'rgba(204, 170, 4, 1)',
        'rgba(98, 145, 17, 1)',
        'rgba(13, 139, 169, 1)',
        '#446CD3',
        'rgba(77, 77, 169, 1)',
        'rgba(131, 131, 131, 1)',
    ],
    subHoverColor: [
        'rgba(233, 76, 94, 1)',
        'rgba(241, 138, 0, 1)',
        'rgba(252, 220, 63, 1)',
        'rgba(199, 231, 149, 1)',
        'rgba(174, 234, 244, 1)',
        '#5980E5',
        'rgba(198, 154, 204, 1)',
        'rgba(200, 200, 200, 1)',
    ],
    subColor: [
        'rgba(248, 201, 206, 1)',
        'rgba(253, 214, 157, 1)',
        'rgba(249, 233, 192, 1)',
        'rgba(222, 231, 208, 1)',
        'rgba(207, 231, 235, 1)',
        '#9FBAFF',
        'rgba(226, 205, 229, 1)',
        'rgba(230, 229, 229, 1)',
    ]
}

const SecondDataLabelText = [
    '증오하다',
    '화나다',

    '감동하다',
    '부럽다',
    '반하다',
    '선호하다',
    '애틋하다',

    '기쁘다',
    '신나다',
    '좋다',
    '행복하다',

    '안정되다',
    '편안하다',
    '만족하다',
    '공감하다',
    '후련하다',

    '미안하다',
    '눈물겹다',
    '서운하다',
    '억울하다',
    '슬프다',
    '외롭다',
    '우울하다',
    '아쉽다',
    '실망하다',
    '후회하다',
    '그립다',

    '심심하다',
    '지루하다',

    '놀라다',
    '무섭다',
    '불쾌하다',
    '조마조마하다',

    '우습다',
    '부끄럽다',
    '불편하다',
    '괴롭다',
    '귀찮다',
    '싫다',
    '짜증내다',
]

const SecondHoverColor = [
        ...FirstData.data.flatMap((size, i) => 
            Array.from({ length: size }, () => 
                [
                    FirstData.subColor[i],
                    FirstData.subHoverColor[i]
                ]
            )
        ),
    ]

const SecondData = (activeWord) => {
    const index = SecondDataLabelText.indexOf(activeWord);
    
    return {
        data: Array.from({ length: dataLength }, () => 1),
        label: Array.from({ length: dataLength }, () => SecondDataLabelText),
        backgroundColor: SecondHoverColor.map((color, i) =>
            i === index ? color[1] : color[0]
        ),
        hoverBackgroundColor: [
            ...FirstData.data.flatMap((size, i) => 
                Array.from({ length: size }, () => FirstData.subHoverColor[i])
            ),
        ],
    }
}

const DoubleDonutData = (activeWord) => (
    {
        datasets: [
            SecondData(activeWord),
            FirstData
        ],
    }
);

export default DoubleDonutChart;