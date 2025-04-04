import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../services/contact.service";
import { ISocialAccount } from "../interfaces/socialAccount.interface";

export const useGetContacts = ({
    currentSocialAccount,
}: {
    currentSocialAccount: ISocialAccount;
}) => {
    return useQuery({
        queryKey: ["contacts"],
        queryFn: () => getContacts(currentSocialAccount!),
    });
};
