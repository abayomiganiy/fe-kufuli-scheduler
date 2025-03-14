import { request } from "../utils/axios-utils";

export const getMessages = async ({ campaignId }: { campaignId: string }) => {
    return await request({
        url: `/messages/${campaignId}/`,
        method: "GET",
    });
};
