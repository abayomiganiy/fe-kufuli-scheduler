// import campaign1 from "../assets/test-campaign/Rectangle 110.png";
// import campaign2 from "../assets/communication-social-media-icons-smartphone-device.png";
// import campaign3 from "../assets/test-campaign/top-performing.png";
import {
    CampaignStatus,
    ICampaign,
    ICampaignFormInput,
} from "../interfaces/campaign.interface";
import { request } from "../utils/axios-utils";

export const getCampaigns = async (filter?: {
    status: CampaignStatus;
}): Promise<ICampaign[]> => {
    const activeCampaigns: ICampaign[] = [];
    // [
    //     {
    //         id: "10",
    //         content: [
    //             {
    //                 id: uuidv4(),
    //                 caption:
    //                     "campaign1 jkf eijneui jierbibiebfi neriuhienhui9nhie rebie8oenor jkd",
    //                 image: campaign1,
    //                 views: 23,
    //                 mimetype: "image",
    //             },
    //         ],
    //         status: "active",
    //         date: new Date("2021-01-01"),
    //     },
    //     {
    //         id: "20",
    //         content: [
    //             {
    //                 id: uuidv4(),
    //                 image: campaign2,
    //                 caption: "Campaign 2",
    //                 views: 23,
    //                 mimetype: "image",
    //             },
    //         ],
    //         status: "active",
    //         date: new Date("2021-01-01"),
    //     },
    //     {
    //         id: "30",
    //         content: [
    //             {
    //                 id: uuidv4(),
    //                 image: campaign3,
    //                 caption: "Campaign 3",
    //                 views: 23,
    //                 mimetype: "image",
    //             },
    //         ],
    //         status: "inactive",
    //         date: new Date("2021-01-01"),
    //     },
    //     {
    //         id: "40",
    //         content: [
    //             {
    //                 id: uuidv4(),
    //                 text: "Join us on Open regist futsal championshup 2024",
    //                 views: 23,
    //                 mimetype: "text",
    //                 backgroundColor: "#ff00ff",
    //             },
    //         ],
    //         status: "active",
    //         date: new Date("2021-01-01"),
    //     },
    //     {
    //         id: "50",
    //         content: [
    //             {
    //                 id: uuidv4(),
    //                 caption: "Campaign 3",
    //                 video: "",
    //                 thumbnail: campaign1,
    //                 contactList: [],
    //                 views: 23,
    //                 mimetype: "video",
    //             },
    //         ],
    //         status: "inactive",
    //         date: new Date("2021-01-01"),
    //     },
    //     {
    //         id: "60",
    //         content: [
    //             {
    //                 id: uuidv4(),
    //                 audio: "",
    //                 contactList: [],
    //                 views: 23,
    //                 mimetype: "audio",
    //             },
    //         ],
    //         status: "active",
    //         date: new Date("2021-01-01"),
    //     },
    // ];

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

    console.log([...formData.entries()]);
    return request({
        method: "POST",
        url: "/campaigns",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
