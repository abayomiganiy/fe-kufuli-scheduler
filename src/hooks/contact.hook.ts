import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../services/contact.service";
import { useCurrentSocialAccount } from "../store/currentSocialAccountStore";

export const useGetContacts = () => {
    const currentSocialAccount = useCurrentSocialAccount(
        (state) => state.currentAccount
    );
    return useQuery({
        queryKey: ["contacts"],
        queryFn: () => getContacts(currentSocialAccount),
    });
};
