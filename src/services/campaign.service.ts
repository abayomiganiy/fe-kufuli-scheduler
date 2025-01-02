import campaign1 from "../assets/test-campaign/Rectangle 110.png";
import campaign2 from "../assets/communication-social-media-icons-smartphone-device.png";
import campaign3 from "../assets/test-campaign/top-performing.png";
import { IActiveCampaign } from "../interfaces/campaign.interface";

export const getCampaigns = async () => {
    const activeCampaigns: IActiveCampaign[] = [
        {
            title: "Campaign 1",
            status: "Active",
            date: "2021-01-01",
            budget: "$10,000",
            impressions: "100,000",
            clicks: "50,000",
            conversions: "25,000",
            image: campaign1,
        },
        {
            title: "Campaign 1",
            status: "Active",
            date: "2021-01-01",
            budget: "$10,000",
            impressions: "100,000",
            clicks: "50,000",
            conversions: "25,000",
            image: campaign2,
        },
        {
            title: "Campaign 1",
            status: "Active",
            date: "2021-01-01",
            budget: "$10,000",
            impressions: "100,000",
            clicks: "50,000",
            conversions: "25,000",
            image: campaign3,
        },
    ];

    return new Promise<IActiveCampaign[]>((resolve) => {
        setTimeout(() => {
            resolve(activeCampaigns);
        }, 5000);
    });
};
