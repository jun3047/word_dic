const WordBox = ({word, color}) => {

    let colorClass;
    switch(color) {
      case 'yellow':
        colorClass = `bg-yellow-main-color`;
        break;
      case 'blue':
        colorClass = `bg-blue-main-color`;
        break;
      // 다른 색상에 대한 case 추가해야함
      default:
        colorClass = ``;
    }
    
    return (
        <div class={`rounded-xl inline-flex items-center justify-center h-36r px-19r py-7r ${colorClass}`}>
            <p className={`body-text font-bold text-white`}>{word}</p>
        </div>
    )
}

export default WordBox;