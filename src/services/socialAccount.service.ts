import { ConnectionNameTypes } from "../interfaces/socialAccount.interface";
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
    type: ConnectionNameTypes;
    phoneNumber?: string;
}) => {
    let resp;
    switch (data.type) {
        case "WHATSAPP":
            resp = await request({
                url: "/social-accounts/connect-whatsapp",
                method: "POST",
                data,
            });
            break;
        default:
            console.log("Invalid connection type");
            new Error("Invalid connection type");
    }
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
