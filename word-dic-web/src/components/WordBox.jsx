const WordBox = ({word, 소속, active, setWord = () => {}}) => {

    let bgColorClass;
    let borderColorClass;
    let textColorClass;
    let hoverBgColorClass;

    switch(소속) {
      case '화나다':
        borderColorClass = `border-red-main-color`
        bgColorClass = `bg-red-main-color`
        hoverBgColorClass = `hover:bg-red-main-color`
        textColorClass = `text-red-main-color`
        break;
      case '감동하다':
        borderColorClass = `border-orange-main-color`
        bgColorClass = `bg-orange-main-color`
        hoverBgColorClass = `hover:bg-orange-main-color`
        textColorClass = `text-orange-main-color`
      break;
      case '행복하다':
        borderColorClass = `border-yellow-main-color`
        bgColorClass = `bg-yellow-main-color`
        hoverBgColorClass = `hover:bg-yellow-main-color`
        textColorClass = `text-yellow-main-color`
      break;
      case '편안하다':
        borderColorClass = `border-green-main-color`
        bgColorClass = `bg-green-main-color`
        hoverBgColorClass = `hover:bg-green-main-color`
        textColorClass = `text-green-main-color`
      break;
      case '슬프다':
        borderColorClass = `border-blue-main-color`
        bgColorClass = `bg-blue-main-color`
        hoverBgColorClass = `hover:bg-blue-main-color`
        textColorClass = `text-blue-main-color`
      break;
      case '무섭다':
        borderColorClass = `border-purple-main-color`
        bgColorClass = `bg-purple-main-color`
        hoverBgColorClass = `hover:bg-purple-main-color`
        textColorClass = `text-purple-main-color`
      break;
      case '지루하다':
        borderColorClass = `border-grey-main-color`
        bgColorClass = `bg-grey-main-color`
        hoverBgColorClass = `hover:bg-grey-main-color`
        textColorClass = `text-grey-main-color`
      break;
      case '싫다':
        borderColorClass = `border-grey-main-color`
        bgColorClass = `bg-grey-main-color`
        hoverBgColorClass = `hover:bg-grey-main-color`
        textColorClass = `text-grey-main-color`
      break;

      default:
        borderColorClass = ``
        bgColorClass = ``
        textColorClass = ``
        hoverBgColorClass = ``
    }

    textColorClass = active ? "text-white" : textColorClass;
    bgColorClass = active ? bgColorClass : `bg-white ${hoverBgColorClass}`;
    
    return (
        <div onClick={()=>setWord(word)} class={`${borderColorClass} ${bgColorClass} border-2 rounded-xl inline-flex items-center justify-center h-36r px-19r py-7r group`}>
            <p className={`${textColorClass} body-text font-bold group-hover:text-white`}>{word}</p>
        </div>
    )
}

export default WordBox;