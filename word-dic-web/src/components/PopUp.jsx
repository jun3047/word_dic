const PopUp = ({on}) => {

    return (
      <div className={`absolute flex flex-col m-0 bg-white rounded-md shadow-md top-70r left-450r w-105r py-10r ${on || 'hidden'}`}>
        <div className="relative flex items-center justify-center w-[100%] h-30r caption-1 text-[#ABABAB] hover:text-[#444444] hover:bg-[#E9E9E9] group">
        <img src="./svg/checkIcon.svg" alt="체크" className="absolute opacity-0 top-8r left-15r group-hover:opacity-100" />
        글자순
        </div>
        <div className="relative flex items-center justify-center w-[100%] h-30r caption-1 text-[#ABABAB] hover:text-[#444444] hover:bg-[#E9E9E9] group">
        <img src="./svg/checkIcon.svg" alt="체크" className="absolute opacity-0 top-8r left-15r group-hover:opacity-100" />
        대중순
        </div>
        <div className="relative flex items-center justify-center w-[100%] h-30r caption-1 text-[#ABABAB] hover:text-[#444444] hover:bg-[#E9E9E9] group">
        <img src="./svg/checkIcon.svg" alt="체크" className="absolute opacity-0 top-8r left-15r group-hover:opacity-100" />
        강도
        </div>
      </div>
    )
}

export default PopUp;