import React from "react";
// import ActiveCampaignsSection from "../../sections/activeCampaignsSection";
import AnalyticsSection from "../../sections/analyticsSection";
import Banners from "./Banners";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 laptop:gap-7 pb-16 pt-10">
            {/* <ActiveCampaignsSection /> */}
            <AnalyticsSection />
            <Banners />
        </div>
    );
};

export default Home;
