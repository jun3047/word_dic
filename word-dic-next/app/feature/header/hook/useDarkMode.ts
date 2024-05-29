import { useEffect } from 'react';
import useDarkModeStore from '@/app/stores/darkMode';

const useDarkMode = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return [isDarkMode, toggleDarkMode] as const;
}

export default useDarkMode;