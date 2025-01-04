import CampaignListGrid from "../../components/campaignListGrid";
import { useGetCampaigns } from "../../hooks/campaign.hook";

const CampaignContainer: React.FC = () => {
    const { data: campaigns, isLoading: campaignsIsLoading } =
        useGetCampaigns();
    if (campaignsIsLoading) {
        return (
            <div>
                <div className="flex gap-4 flex-nowrap">Loading...</div>
            </div>
        );
    }
    return <CampaignListGrid campaigns={campaigns!} />;
};

export default CampaignContainer;
