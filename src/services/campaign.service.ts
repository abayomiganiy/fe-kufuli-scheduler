import campaign1 from "../assets/test-campaign/Rectangle 110.png";
import campaign2 from "../assets/communication-social-media-icons-smartphone-device.png";
import campaign3 from "../assets/test-campaign/top-performing.png";
import {
    CampaignStatus,
    CreateAudioMessage,
    CreateAudioStoryData,
    CreateImageMessage,
    CreateTextMessage,
    CreateTextStoryData,
    CreateVideoMessage,
    CreateVideoStoryData,
    ICampaign,
} from "../interfaces/campaign.interface";

export const getCampaigns = async (filter?: {
    status: CampaignStatus;
}): Promise<ICampaign[]> => {
    const activeCampaigns: ICampaign[] = [
        {
            id: "10",
            content: [
                {
                    caption: "campaign1 jkf eijneui jierbibiebfi neriuhienhui9nhie rebie8oenor jkd",
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
                    text: "Join us on Open regist futsal championshup 2024",
                    views: 23,
                    mimetype: "text",
                    backgroundColor: "#ff00ff",
                } as CreateTextMessage | CreateTextStoryData,
            ],
            status: "active",
            date: new Date("2021-01-01"),
        },
        {
            id: "50",
            content: [
                {
                    caption: "Campaign 3",
                    video: "",
                    thumbnail: campaign1,
                    contactList: [],
                    views: 23,
                    mimetype: "video",
                } as CreateVideoMessage | CreateVideoStoryData,
            ],
            status: "inactive",
            date: new Date("2021-01-01"),
        },
        {
            id: "60",
            content: [
                {
                    audio: "",
                    contactList: [],
                    views: 23,
                    mimetype: "audio",
                } as CreateAudioMessage | CreateAudioStoryData,
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
