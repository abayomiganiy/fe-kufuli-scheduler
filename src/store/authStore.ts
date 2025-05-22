import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
    token?: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            token: undefined,
            login: (token: string | null) => set({ token }),
            logout: () => set({ token: null }),
        }),
        {
            name: "auth-storage",
        }
    )
);
