import React, { useRef } from 'react';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

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
            const centerAngle = element.startAngle + (element.endAngle - element.startAngle) / 2;

            const radius = (element.innerRadius + element.outerRadius) / 2;
            const posX = element.x + Math.cos(centerAngle) * radius;
            const posY = element.y + Math.sin(centerAngle) * radius;
    
            ctx.fillStyle = '#555555';
            ctx.font = '1.06rem SUIT';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            
            ctx.fillText(text, posX, posY);
          });
        });
        ctx.restore(); // 캔버스 상태 복원    
    }
};
  
Chart.register(doughnutLabelPlugin);

const DoubleDonutChart = ({setWord, word}) => {
  const chartRef = useRef();
  const onClick = (e) => console.log(getElementAtEvent(chartRef.current, e)[0])

  const emojiName = word;
  // setWord는 도넛에서 등록

  const options = {
    responsive: true,
    cutout: 95,
    hoverOffset: 0,
    borderWidth: 4,
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

const dataLength = 56;

const FirstData = {
    data: [10, 20, 30, 40, 50, 60, 70],
    label: ['나쁜', '화난', '놀라운', '두려운', '슬픈', '행복한', '역겨운'],
    backgroundColor: [
        'rgba(233, 76, 94, 1)',
        'rgba(241, 138, 0, 1)',
        'rgba(252, 220, 63, 1)',
        'rgba(199, 231, 149, 1)',
        'rgba(174, 234, 244, 1)',
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
        'rgba(77, 77, 169, 1)',
        'rgba(131, 131, 131, 1)',
    ],
    subHoverColor: [
        'rgba(233, 76, 94, 1)',
        'rgba(241, 138, 0, 1)',
        'rgba(252, 220, 63, 1)',
        'rgba(199, 231, 149, 1)',
        'rgba(174, 234, 244, 1)',
        'rgba(198, 154, 204, 1)',
        'rgba(200, 200, 200, 1)',
    ],
    subColor: [
        'rgba(248, 201, 206, 1)',
        'rgba(253, 214, 157, 1)',
        'rgba(249, 233, 192, 1)',
        'rgba(222, 231, 208, 1)',
        'rgba(207, 231, 235, 1)',
        'rgba(226, 205, 229, 1)',
        'rgba(230, 229, 229, 1)',
    ]
}

const SecondData = {
    data: Array.from({ length: dataLength }, () => 5),
    label: Array.from({ length: dataLength }, () => 'word'),
    backgroundColor: [
        ...FirstData.data.flatMap((size, i) => 
            Array.from({ length: size/5 }, () => FirstData.subColor[i])
        ),
    ],
    hoverBackgroundColor: [
        ...FirstData.data.flatMap((size, i) => 
            Array.from({ length: size/5 }, () => FirstData.subHoverColor[i])
        ),
    ],
}

const data = {
    datasets: [
        SecondData,
        FirstData
    ],
};

export default DoubleDonutChart;