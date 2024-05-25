import { create } from 'zustand';

const useDarkModeStore = create((set) => ({
  isDarkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    return { isDarkMode: newMode };
  }),
}));

export default useDarkModeStore;