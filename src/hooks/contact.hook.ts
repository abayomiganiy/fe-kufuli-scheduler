import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";
import { useCurrentSocialAccount } from "../store/currentSocialAccountStore";

export const useGetContacts = () => {
    const currentSocialAccount = useCurrentSocialAccount(
        (state) => state.currentAccount
    );
    return useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const resp = await request({
                url: `/contacts/${currentSocialAccount?.name}`,
                method: "GET",
            });
            return resp;
        },
    });
};
