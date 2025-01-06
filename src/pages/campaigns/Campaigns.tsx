import React from "react";
import SectionHeader from "../../components/sectionHeader";
import CampaignContainer from "../../containers/campaignsContainer";

const Campaigns: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Campaigns" />
            <CampaignContainer />
        </div>
    );
};

export default Campaigns;
