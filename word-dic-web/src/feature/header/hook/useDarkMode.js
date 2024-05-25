// useDarkMode.js
import { useEffect } from 'react';
import useDarkModeStore from 'stores/darkMode';

const useDarkMode = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#000000');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = '#000000';
        document.head.appendChild(meta);
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#ffffff');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = '#ffffff';
        document.head.appendChild(meta);
      }
    }
  }, [isDarkMode]);

  return [isDarkMode, toggleDarkMode];
}

export default useDarkMode;
