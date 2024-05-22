
import PopUp from 'feature/similarExpressionWords/component/PopUp';
import TrackButton from 'feature/logging/TrackButton';
import useToggle from "feature/common/hook/useToggle";

const FilterHeader = ({
    alignType,
    setAlignType
}) => {

    const [onPopup, changePopup] = useToggle(false);

    return(
        <header className="flex items-center justify-between w-full py-11r h-76r">
            <h2 className="font-bold headline-2">유사단어 표현</h2>
            <TrackButton 
                eventName={`click_분류-${!onPopup ? 'ON' : 'OFF'}`}
                onClick={changePopup}
                className={`flex relative items-center justify-center w-40r h-40r rounded-full ${onPopup ? 'bg-[#F1F1F1]' : ''}`}
            >
                <img className="w-20r h-17r" src="/svg/alignIcon.svg" alt="alignIcon" />
                <PopUp
                    alignType={alignType}
                    setAlignType={setAlignType}
                    on={onPopup}
                />
            </TrackButton>
        </header>
    )
}

export default FilterHeader;