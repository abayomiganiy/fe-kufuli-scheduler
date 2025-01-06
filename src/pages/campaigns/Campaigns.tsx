import React from "react";
import CampaignsContainer from "../../containers/campaignsContainer";
import Button from "../../components/button";

const Campaigns: React.FC = () => {
    return (
        <div className="relative">
            <CampaignsContainer />
            <Button className="fixed bottom-0 left-4 right-4 laptop:hidden">Create campaign</Button>
        </div>
    );
};

export default Campaigns;
