const 연관검색어 = ({keyword, on}) => {

  const relatedKeyword = [
    '연관검색어1',
    '연관검색어2',
    '연관검색어3',
  ]
  
  //keyword를 기반으로 연관검색어를 받아온다고 가정

  return (
    <div className={`z-10 bg-white rounded-md top-46r right-0r py-15r absolute w-full flex flex-col shadow-md ${on || 'hidden'}`}>
      {
        relatedKeyword.map((text, i) => (
          <div key={i} className="px-52r bg-white relative flex items-center w-[100%] h-30r caption-1 text-[#ABABAB] hover:text-[#444444] hover:bg-[#E9E9E9]">
            <img src="./svg/searchIcon.svg" alt="검색아이콘" className="absolute w-12r h-12r top-8r left-15r" />
            {text}
          </div>
        ))
      }
    </div>
  )
}

export default 연관검색어;