import React from "react";
import CampaignsContainer from "../../containers/campaignsContainer";
import Button from "../../components/button";

const Campaigns: React.FC = () => {
    return (
        <div className="relative">
            <CampaignsContainer />
            <div className="flex justify-center items-center px-4 py-2 fixed bottom-0 left-0 right-0 laptop:hidden bg-white">
                <Button className="w-full">
                    Create campaign
                </Button>
            </div>
        </div>
    );
};

export default Campaigns;
