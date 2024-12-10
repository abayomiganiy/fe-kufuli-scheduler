import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ISocialAccount } from "../interfaces/socialAccount.interface";

interface CurrentSocialAccount {
    currentAccount: ISocialAccount | null;
    setCurrentAccount: (socialAccount: ISocialAccount) => void;
}

export const useCurrentSocialAccount = create<CurrentSocialAccount>()(
    persist(
        (set) => ({
            currentAccount: null,
            setCurrentAccount: (account) => set({ currentAccount: account }),
        }),
        {
            name: "current-account",
        }
    )
);
