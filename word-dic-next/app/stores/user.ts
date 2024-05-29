import { create } from 'zustand';

interface UserState {
  userToken: string | null;
  setToken: (license: string) => void;
  getToken: () => Promise<string | null>;
}

const TOKEN_NAME = 'token';

const useUserStore = create<UserState>((set) => ({
  userToken: typeof window !== 'undefined' ? localStorage.getItem(TOKEN_NAME) : null,
  setToken: async (license: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_NAME, license);
      set({ userToken: license });
    }
  },
  getToken: async () => {
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem(TOKEN_NAME);
        return token;
      } catch (error) {
        localStorage.removeItem(TOKEN_NAME);
        console.error(`in User Zustand: ${error}`);
        return null;
      }
    }
    return null;
  },
}));

export default useUserStore;