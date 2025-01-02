import { ISocialAccount } from "../interfaces/socialAccount.interface";
import { request } from "../utils/axios-utils";

export const getContacts = async (
    currentSocialAccount: ISocialAccount | null
) => {
    const resp = await request({
        url: `/contacts/${currentSocialAccount?.name}`,
        method: "GET",
    });
    return resp;
};
