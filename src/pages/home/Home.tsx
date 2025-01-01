import React from "react";
import ActiveCampaignsSection from "../../sections/activeCampaignsSection";
import AnalyticsSection from "../../sections/analyticsSection";

const Home: React.FC = () => {
    return (
        <div className="">
            <ActiveCampaignsSection />
            <AnalyticsSection />
        </div>
    );
};

export default Home;
