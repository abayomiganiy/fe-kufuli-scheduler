import {
    CampaignStatus,
    ICampaign,
    ICampaignFormInput,
} from "../interfaces/campaign.interface";
import { request } from "../utils/axios-utils";

export const getCampaigns = async (filter?: {
    status: CampaignStatus;
}): Promise<ICampaign[]> => {
    console.log(filter);
    const campaigns = await request({
        method: "GET",
        url: "/campaigns",
    });
    return campaigns;
};

export const createCampaign = async (data: ICampaignFormInput) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("socialAccountId", data.socialAccountId);
    formData.append("recipients", JSON.stringify(data.recipients));
    formData.append("frequency", data.frequency);
    formData.append("scheduledTime", data.scheduledTime.toISOString());
    formData.append("messages", JSON.stringify(data.messages));
    formData.append("isEighteenPlus", JSON.stringify(data.isEighteenPlus));

    data.messages.forEach((message) => {
        switch (true) {
            case "image" in message.message:
                formData.append(`files`, message.message.image.url);
                break;

            case "video" in message.message:
                formData.append(`files`, message.message.video.url);
                break;

            case "audio" in message.message:
                formData.append(`files`, message.message.audio.url);
                break;

            default:
                break;
        }
    });

    return request({
        method: "POST",
        url: "/campaigns",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
