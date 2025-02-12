import campaign1 from "../assets/test-campaign/Rectangle 110.png";
import campaign2 from "../assets/communication-social-media-icons-smartphone-device.png";
import campaign3 from "../assets/test-campaign/top-performing.png";
import {
    CampaignStatus,
    CreateAudioMessage,
    CreateAudioStory,
    CreateImageMessage,
    CreateTextMessage,
    CreateTextStory,
    CreateVideoMessage,
    CreateVideoStory,
    ICampaign,
} from "../interfaces/campaign.interface";
import { v4 as uuidv4 } from "uuid";
import { request } from "../utils/axios-utils";
import { ICampaignFormInput } from "../pages/createCampaign/CreateCampaign";

export const getCampaigns = async (filter?: {
    status: CampaignStatus;
}): Promise<ICampaign[]> => {
    const activeCampaigns: ICampaign[] = [
        {
            id: "10",
            content: [
                {
                    id: uuidv4(),
                    caption:
                        "campaign1 jkf eijneui jierbibiebfi neriuhienhui9nhie rebie8oenor jkd",
                    image: campaign1,
                    views: 23,
                    mimetype: "image",
                } as CreateImageMessage,
            ],
            status: "active",
            date: new Date("2021-01-01"),
        },
        {
            id: "20",
            content: [
                {
                    id: uuidv4(),
                    image: campaign2,
                    caption: "Campaign 2",
                    views: 23,
                    mimetype: "image",
                } as CreateImageMessage,
            ],
            status: "active",
            date: new Date("2021-01-01"),
        },
        {
            id: "30",
            content: [
                {
                    id: uuidv4(),
                    image: campaign3,
                    caption: "Campaign 3",
                    views: 23,
                    mimetype: "image",
                } as CreateImageMessage,
            ],
            status: "inactive",
            date: new Date("2021-01-01"),
        },
        {
            id: "40",
            content: [
                {
                    id: uuidv4(),
                    text: "Join us on Open regist futsal championshup 2024",
                    views: 23,
                    mimetype: "text",
                    backgroundColor: "#ff00ff",
                } as CreateTextMessage | CreateTextStory,
            ],
            status: "active",
            date: new Date("2021-01-01"),
        },
        {
            id: "50",
            content: [
                {
                    id: uuidv4(),
                    caption: "Campaign 3",
                    video: "",
                    thumbnail: campaign1,
                    contactList: [],
                    views: 23,
                    mimetype: "video",
                } as CreateVideoMessage | CreateVideoStory,
            ],
            status: "inactive",
            date: new Date("2021-01-01"),
        },
        {
            id: "60",
            content: [
                {
                    id: uuidv4(),
                    audio: "",
                    contactList: [],
                    views: 23,
                    mimetype: "audio",
                } as CreateAudioMessage | CreateAudioStory,
            ],
            status: "active",
            date: new Date("2021-01-01"),
        },
    ];

    return new Promise<ICampaign[]>((resolve) => {
        setTimeout(() => {
            resolve(
                filter
                    ? activeCampaigns.filter(
                          (campaign) => campaign.status === filter.status
                      )
                    : activeCampaigns
            );
        }, 3000);
    });
};

export const createCampaign = async (data: ICampaignFormInput) => {
    console.log(data);
    return request({
        method: "POST",
        url: "/campaigns",
        data: {
            name: "My Business Campaign",
            socialAccountId: "cm71kg7a5000313vp600fl9dg",
            recipients: ["2349012702790", "2349012702791", "2349012702792"],
            repeatInterval: "DAILY",
            scheduledTime: "2025-12-06 07:58:29.041Z",
        },
    });
};
