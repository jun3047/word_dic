import React, { useRef } from 'react';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { trackEvent } from '@/app/feature/logging/amplitude';
import useDarkMode from '@/app/feature/header/hook/useDarkMode';

Chart.register(ArcElement);

const doughnutLabelPlugin = {
    id: 'doughnutLabelPlugin',
    afterDraw: (chart: any) => {
        const ctx = chart.ctx;
        ctx.save(); // 캔버스 상태 저장

        chart.data.datasets.forEach((dataset: any, datasetIndex: any) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((element: any, index: any) => {

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

const DoubleDonutChart = ({ setWord, emojiName, activeWord }: any) => {

    const [isDarkMode] = useDarkMode();
    const data: any = DoubleDonutData(activeWord, isDarkMode);
    const chartRef = useRef<any>();
    const onClick = (e: any) => {

        const element = getElementAtEvent(chartRef.current, e)[0];

        if (element?.datasetIndex === undefined) return;

        const { datasetIndex, index } = element;

        const nextWord =
            datasetIndex === 0 ?
                data.datasets[datasetIndex].label[0][index] :
                data.datasets[datasetIndex].label[index];
        setWord(nextWord);

        trackEvent(`click_차트-${nextWord}-${datasetIndex}`);
    }

    const options = {
        responsive: true,
        cutout: 95,
        hoverOffset: 15,
        borderWidth: 2,
        borderColor: isDarkMode ? '#262626' : '#fff',
        animation: {
            duration: 0
        }
    };

    return (
        <section className="relative flex items-center justify-center w-full h-full aspect-square min-w-500r min-h-500r max-w-590r">
            <img
                className="absolute w-190r h-190r"
                src={`/emoji/${emojiName}.png`}
                alt="emoji"
            />
            <Doughnut ref={chartRef} onClick={onClick} data={data} options={options} />
        </section>
    );
};

// 저장된 단어 csv 파일을 읽어와서 data를 구성하도록 수정해야 함

const dataLength = 40;

const FirstData = (isDarkMode: boolean) => {

    return (
        {
            data: [3, 5, 4, 5, 11, 2, 3, 7],
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
                isDarkMode ? '#f05e6f' : 'rgba(233, 76, 94, 1)',
                isDarkMode ? '#e3880d' : 'rgba(241, 138, 0, 1)',
                isDarkMode ? '#eed453' : 'rgba(252, 220, 63, 1)',
                isDarkMode ? '#8eb944' : 'rgba(199, 231, 149, 1)',
                isDarkMode ? '#5ea8ba' : 'rgba(174, 234, 244, 1)',
                isDarkMode ? '#768CFF' : '#5980E5',
                isDarkMode ? '#b18ccf' : 'rgba(198, 154, 204, 1)',
                isDarkMode ? '#bbbaba' : 'rgba(200, 200, 200, 1)',
            ],
            borderWidth: 2,
            borderColor: isDarkMode ? "#262626" : '#fff',
            hoverBorderColor: [
                isDarkMode ? '#c24150' : 'rgba(151, 42, 42, 1)',
                isDarkMode ? '#af6603' : 'rgba(185, 92, 52, 1)',
                isDarkMode ? '#cdb335' : 'rgba(204, 170, 4, 1)',
                isDarkMode ? '#66882c' : 'rgba(98, 145, 17, 1)',
                isDarkMode ? '#448a9b' : 'rgba(13, 139, 169, 1)',
                isDarkMode ? '#5867C3' : '#446CD3',
                isDarkMode ? '#6d619b' : 'rgba(77, 77, 169, 1)',
                isDarkMode ? '#8a8a8a' : 'rgba(131, 131, 131, 1)',
            ],
            subHoverColor: [
                isDarkMode ? '#f05e6f' : 'rgba(233, 76, 94, 1)',
                isDarkMode ? '#e3880d' : 'rgba(241, 138, 0, 1)',
                isDarkMode ? '#eed453' : 'rgba(252, 220, 63, 1)',
                isDarkMode ? '#8eb944' : 'rgba(199, 231, 149, 1)',
                isDarkMode ? '#5ea8ba' : 'rgba(174, 234, 244, 1)',
                isDarkMode ? '#768CFF' : '#5980E5',
                isDarkMode ? '#b18ccf' : 'rgba(198, 154, 204, 1)',
                isDarkMode ? '#bbbaba' : 'rgba(200, 200, 200, 1)',
            ],
            subColor: [
                isDarkMode ? '#f0b0b7' : 'rgba(248, 201, 206, 1)',
                isDarkMode ? '#d8b179' : 'rgba(253, 214, 157, 1)',
                isDarkMode ? '#edd59a' : 'rgba(249, 233, 192, 1)',
                isDarkMode ? '#bacb9f' : 'rgba(222, 231, 208, 1)',
                isDarkMode ? '#a8c7cc' : 'rgba(207, 231, 235, 1)',
                isDarkMode ? '#aab8ff' : '#9FBAFF',
                isDarkMode ? '#e2cde5' : 'rgba(226, 205, 229, 1)',
                isDarkMode ? '#d0d0d0' : 'rgba(230, 229, 229, 1)',
            ]
        }
    )
}

const SecondDataLabelText = [
    '불쾌하다',
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
    '정겹다',

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
    '조마조마하다',

    '우습다',
    '부끄럽다',
    '불편하다',
    '괴롭다',
    '귀찮다',
    '싫다',
    '짜증내다',
]

const SecondHoverColor = (isDarkMode: boolean) => {

    return [
        ...FirstData(isDarkMode).data.flatMap((size, i) =>
            Array.from({ length: size }, () =>
                [
                    FirstData(isDarkMode).subColor[i],
                    FirstData(isDarkMode).subHoverColor[i]
                ]
            )
        ),
    ]
}

const SecondData = (activeWord: string, isDarkMode: boolean) => {
    const index = SecondDataLabelText.indexOf(activeWord);

    return {
        data: Array.from({ length: dataLength }, () => 1),
        label: Array.from({ length: dataLength }, () => SecondDataLabelText),
        backgroundColor: SecondHoverColor(isDarkMode).map((color, i) =>
            i === index ? color[1] : color[0]
        ),
        hoverBackgroundColor: [
            ...FirstData(isDarkMode).data.flatMap((size, i) =>
                Array.from({ length: size }, () => FirstData(isDarkMode).subHoverColor[i])
            ),
        ],
        borderColor: isDarkMode ? "#262626" : '#fff',
    }
}

const DoubleDonutData = (activeWord: string, isDarkMode: boolean) => (
    {
        datasets: [
            SecondData(activeWord, isDarkMode),
            FirstData(isDarkMode),
        ],
    }
);

export default DoubleDonutChart;