import React from "react";
import SectionHeader from "../../components/sectionHeader";
import { useGetCampaigns } from "../../hooks/campaign.hook";
import { ICampaign } from "../../interfaces/campaign.interface";

const Campaigns: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Active Campaigns" />
            <CampaignContainer />
        </div>
    );
};

const CampaignContainer: React.FC = () => {
    const { data: campaigns, isLoading: campaignsIsLoading } =
        useGetCampaigns();
    return (
        <div>
            {campaignsIsLoading ? (
                <div>
                    <div className="flex gap-4 flex-nowrap">
                        {/* {[1, 2, 3]?.map((_, index) => (
                            <CampaignLoading key={index} />
                        ))} */}
                        Loading...
                    </div>
                </div>
            ) : (
                <CampaignListGrid campaigns={campaigns!} />
            )}
        </div>
    );
};

const CampaignListGrid: React.FC<{ campaigns: ICampaign[] }> = ({
    campaigns,
}) => {
    return (
        <div className="grid laptop:grid-cols-5 tablet:grid-cols-4 grid-cols-2 gap-5">
            {campaigns?.map((campaign, index) => (
                <CampaignGrid key={index} campaign={campaign} />
            ))}
        </div>
    );
};

const CampaignGrid: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
    return (
        <div className="w-full flex flex-col items-center">
            <img
                src={campaign.image}
                alt={campaign.title}
                className="laptop:h-56 laptop:w-44 h-56 w-40 object-cover rounded-lg"
            />
            <div>{campaign.title}</div>
        </div>
    );
};

export default Campaigns;
