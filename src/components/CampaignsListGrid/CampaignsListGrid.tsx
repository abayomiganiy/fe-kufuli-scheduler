import { ICampaign } from "../../interfaces/campaign.interface";
import CampaignGrid from "../campaignGrid";

const CampaignsListGrid: React.FC<{ campaigns: ICampaign[] }> = ({
    campaigns,
}) => {
    return (
        <div className="grid laptop:grid-cols-5 tablet:grid-cols-4 grid-cols-2 gap-5">
            {campaigns?.map((campaign) => (
                <CampaignGrid key={campaign.id} campaign={campaign} />
            ))}
        </div>
    );
};

export default CampaignsListGrid;
