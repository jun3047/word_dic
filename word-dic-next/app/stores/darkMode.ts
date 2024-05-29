import { create } from 'zustand';

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: typeof window !== 'undefined' && JSON.parse(localStorage.getItem('darkMode') || 'false'),
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(newMode));
    }
    return { isDarkMode: newMode };
  }),
}));

export default useDarkModeStore;