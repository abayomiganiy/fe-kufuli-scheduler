import React from "react";
import campaign1 from "../../assets/test-campaign/Rectangle 110.png";
import campaign2 from "../../assets/communication-social-media-icons-smartphone-device.png";
import campaign3 from "../../assets/test-campaign/top-performing.png";

interface IActiveCampaign {
    title: string;
    status: string;
    date: string;
    budget: string;
    impressions: string;
    clicks: string;
    conversions: string;
    image: string;
}

const ActiveCampaigns: React.FC = () => {
    const activeCampaigns: IActiveCampaign[] = [
        {
            title: "Campaign 1",
            status: "Active",
            date: "2021-01-01",
            budget: "$10,000",
            impressions: "100,000",
            clicks: "50,000",
            conversions: "25,000",
            image: campaign1,
        },
        {
            title: "Campaign 1",
            status: "Active",
            date: "2021-01-01",
            budget: "$10,000",
            impressions: "100,000",
            clicks: "50,000",
            conversions: "25,000",
            image: campaign2,
        },
        {
            title: "Campaign 1",
            status: "Active",
            date: "2021-01-01",
            budget: "$10,000",
            impressions: "100,000",
            clicks: "50,000",
            conversions: "25,000",
            image: campaign3,
        },
    ];
    return (
        <div className="flex overflow-auto no-scrollbar">
            <div className="flex gap-4 flex-nowrap">
                <div className="laptop:w-40 w-32 laptop:h-64 h-48 cursor-pointer flex flex-col items-center justify-between bg-[#E5E5E5] p-4 rounded-2xl border border-gray-200">
                    <svg
                        width="72"
                        height="72"
                        viewBox="0 0 72 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                    >
                        <path
                            d="M36 24V48M48 36H24"
                            stroke="#202020"
                            stroke-width="4.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M66 36C66 19.4314 52.5684 6 36 6C19.4314 6 6 19.4314 6 36C6 52.5684 19.4314 66 36 66C52.5684 66 66 52.5684 66 36Z"
                            stroke="#202020"
                            stroke-width="4.5"
                        />
                    </svg>
                    <div className="">New campaign</div>
                </div>
                {activeCampaigns.map((campaign, index) => (
                    <ActiveCampaign key={index} campaign={campaign} />
                ))}
            </div>
        </div>
    );
};

const ActiveCampaign: React.FC<{ campaign: IActiveCampaign }> = ({
    campaign,
}) => {
    return (
        <div className="relative laptop:w-40 w-32 laptop:h-64 h-48 flex cursor-pointer items-end justify-between p-4 rounded-2xl text-white">
            <>
                <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full absolute top-0 left-0 object-cover rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-t from-0 from-black to-50% to-transparent opacity-80" />
            </>
            <div className="ml-4 z-40">
                <h3 className="text-sm font-medium">{campaign.title}</h3>
            </div>
        </div>
    );
};

export default ActiveCampaigns;
