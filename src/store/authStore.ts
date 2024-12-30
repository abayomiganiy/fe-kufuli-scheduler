import { create } from "zustand";

interface IAuth {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuth>((set) => ({
    token: null,
    login: (token: string | null) => set({ token }),
    logout: () => set({ token: null }),
}));
