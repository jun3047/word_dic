import { create } from 'zustand';

const TOKEN_NAME = 'token'

const useUserStore = create((set) => ({
  userToken: localStorage.getItem(TOKEN_NAME),
  setToken: async (license) => {
    console.log("license:", license)
    localStorage.setItem(TOKEN_NAME, license);
    set({ userToken: license });
  },
  getToken: async () => {
    try {
        const token = localStorage.getItem(TOKEN_NAME);
        return token;
    } catch (error) {
        localStorage.removeItem(TOKEN_NAME);
        console.error(`in User Zustand: ${error.message}`);
    }
  },
}));

export default useUserStore;