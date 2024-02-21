const PopUp = ({on, nowAlign, setNowAlign}) => {

    return (
      <div className={`absolute flex flex-col m-0 bg-white rounded-md shadow-md top-50r right-0r w-105r py-10r ${on || 'hidden'}`}>
        {
          ['글자순', '대중성', '강도'].map((text, i) =>{

              const isNowAlign = text === nowAlign;

              return (
                <div key={i} onClick={()=>setNowAlign(text)} className={`relative flex items-center justify-center w-[100%] h-30r caption-1 ${isNowAlign ? 'text-[#444444] bg-[#E9E9E9]' : 'text-[#ABABAB] '} hover:text-[#444444] hover:bg-[#E9E9E9]`}>
                  <img src="./svg/checkIcon.svg" alt="체크" className={`absolute opacity-0 top-8r left-15r ${isNowAlign && "opacity-100"}`} />
                  {text}
                </div>
              )
            }
          )
        }
      </div>
    )
}

export default PopUp;