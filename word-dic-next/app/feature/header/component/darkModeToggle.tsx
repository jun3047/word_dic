import useDarkMode from "@/app/feature/header/hook/useDarkMode";
import MoonIcon from "@/public/svg/moon.svg";
import SunIcon from "@/public/svg/sun.svg";
import { memo } from "react";

const DarkModeToggle = () => {

  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`hidden md:flex transition-colors duration-300 absolute items-center justify-center border-1 rounded-full gap-17r right-120r w-100r h-46r py-5r px-8r dark:bg-bg dark:border-c-grey-60 bg-white border-c-grey-50`}
    >
      <div className={`absolute rounded-full w-36r h-36r transition-transform-colors duration-300 dark:right-10r dark:bg-c-grey-60 right-51r bg-c-grey-40`} />
      <SunIcon
        className={`w-24r h-24r z-10 transition-colors duration-300 dark:text-c-grey-60 text-c-grey-90`}
      />
      <MoonIcon
        className={`w-24r h-24r z-10 transition-colors duration-300 dark:text-c-grey-20 text-c-grey-60`}
      />
    </button>
  );
};

export default memo(DarkModeToggle);