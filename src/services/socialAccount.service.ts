import { request } from "../utils/axios-utils";

export const getSocialAccounts = async () => {
    const resp = await request({
        url: "/social-accounts",
        method: "GET",
    });
    return resp;
};

export const connectSocialAccount = async (data: {
    name: string;
    type: "WHATSAPP";
}) => {
    const resp = await request({
        url: "/social-accounts",
        method: "POST",
        data,
    });
    return resp;
};
export const deleteSocialAccount = async (data: {
    id: string;
    sessionId: string;
}) => {
    const resp = await request({
        url: `/social-accounts/${data.id}/${data.sessionId}`,
        method: "DELETE",
    });
    return resp;
};
