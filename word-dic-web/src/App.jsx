import React, { useRef } from 'react';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import styled from 'styled-components';
Chart.register(ArcElement);

const App = () => {
  return (
    <div>
      <ErrorBoundary>
        <h1>Double Donut Chart</h1>
        <DoubleDonutChart />
      </ErrorBoundary>
    </div>
  );
};

const DoubleDonutChart = () => {

  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event)[0]);
  }

  // 데이터 및 옵션 설정
  const data = {
    labels: [
      'Label 1',
    ],
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
        hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
      },
      {
        data: [10, 20, 10, 20, 30, 40, 50, 60, 70, 30, 40, 50, 60, 70],
        backgroundColor: ['rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)'],
        hoverBackgroundColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: 95,
    hoverOffset: 0,
    borderWidth: 4,
  }

  return (
    <DoubleDonutChartContainer>
      <Emoji emojiName={'분노'}/>
      <Doughnut ref={chartRef} onClick={onClick} data={data} options={options} />
    </DoubleDonutChartContainer>
  )
};

const Emoji = ({emojiName}) => {

  const EmojiContainer = styled.img`
    position: absolute;

    width: 140px;
    height: 140px;
  `

  return (
    <EmojiContainer src={`${process.env.PUBLIC_URL}/emoji/${emojiName}.png`} alt="emoji" />
    )
}

const DoubleDonutChartContainer = styled.div`
  position: relative;
  width: 590px;
  height: 590px;

  display: flex;
  justify-content: center;
  align-items: center;
`

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // 에러를 로깅하거나 다른 작업을 수행할 수 있습니다.
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생했을 때 표시할 내용
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

export default App;