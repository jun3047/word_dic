import PopUp from '@/app/feature/similarExpressionWords/component/PopUp';
import TrackButton from '@/app/feature/logging/TrackButton';
import useToggle from "@/app/feature/common/hook/useToggle";
import AlignIcon from '@/public/svg/alignIcon.svg';

const FilterHeader = ({
    alignType,
    setAlignType
}: {
    alignType: AlignType;
    setAlignType: (alignType: AlignType) => void
}) => {

    const [onPopup, changePopup] = useToggle(false);

    return (
        <header className="flex items-center justify-between w-full py-11r h-76r">
            <h2 className="font-bold headline-2 dark:text-title-2">유사단어 표현</h2>
            <TrackButton
                eventName={`click_분류-${!onPopup ? 'ON' : 'OFF'}`}
                onClick={() => changePopup()}
                className={`flex relative items-center justify-center w-40r h-40r rounded-full hover:bg-[#F1F1F1] dark:hover:bg-c-grey-70 ${onPopup ? 'bg-[#F1F1F1] dark:bg-c-grey-70' : ''}`}
            >
                <AlignIcon
                    className="w-20r h-17r dark:text-title-2"
                    alt="alignIcon"
                />
                <PopUp
                    alignType={alignType}
                    setAlignType={(type: AlignType) => setAlignType(type)}
                    on={onPopup}
                />
            </TrackButton>
        </header>
    )
}

export default FilterHeader;