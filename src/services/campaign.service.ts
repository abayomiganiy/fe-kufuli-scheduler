import campaign1 from "../assets/test-campaign/Rectangle 110.png";
import campaign2 from "../assets/communication-social-media-icons-smartphone-device.png";
import campaign3 from "../assets/test-campaign/top-performing.png";
import { CampaignStatus, ICampaign } from "../interfaces/campaign.interface";

export const getCampaigns = async (filter?: {
    status: CampaignStatus;
}): Promise<ICampaign[]> => {
    const activeCampaigns: ICampaign[] = [
        {
            title: "Campaign 1",
            status: "active",
            date: "2021-01-01",
            budget: "$10,000",
            impressions: "100,000",
            clicks: "50,000",
            conversions: "25,000",
            image: campaign1,
        },
        {
            title: "Campaign 1",
            status: "inactive",
            date: "2021-01-01",
            budget: "$10,000",
            impressions: "100,000",
            clicks: "50,000",
            conversions: "25,000",
            image: campaign3,
        },
        {
            title: "Campaign 1",
            status: "active",
            date: "2021-01-01",
            budget: "$10,000",
            impressions: "100,000",
            clicks: "50,000",
            conversions: "25,000",
            image: campaign2,
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
