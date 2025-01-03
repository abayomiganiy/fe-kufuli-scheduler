export type CampaignStatus = "active" | "pending" | "inactive";
export interface ICampaign {
    title: string;
    status: CampaignStatus;
    date: string;
    budget: string;
    impressions: string;
    clicks: string;
    conversions: string;
    image: string;
}
