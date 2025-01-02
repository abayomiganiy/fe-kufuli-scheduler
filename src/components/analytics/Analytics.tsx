import React from "react";
import Button from "../button";
import PremiumIcon from "../icons/premiumIcon";
import { Link, useNavigate } from "react-router-dom";
import topPerformingCampaign from "../../assets/test-campaign/top-performing.png";

interface IAnalytics {
    name: string;
    used: number;
    assigned?: number;
}

const Analytics: React.FC = () => {
    const navigate = useNavigate();
    const analytics: IAnalytics[] = [
        {
            name: "Messages schedule",
            used: 25,
            assigned: 500,
        },
        {
            name: "Campaigns",
            used: 1,
            assigned: 5,
        },
        {
            name: "WhatsApp Story Scheduling",
            used: 2,
            assigned: 5,
        },
        {
            name: "Total Views per Story/Message",
            used: 94,
            assigned: +18,
        },
        {
            name: "Average Views per Story",
            used: 25,
            assigned: 500,
        },
        {
            name: "Engagement Rate",
            used: 100,
        },
    ];

    return (
        <div className="grid laptop:grid-cols-4 grid-cols-2 gap-4">
            <div className="flex flex-col justify-start items-start w-full p-4 border border-[#E0E0E0] rounded-xl">
                <div className="flex flex-col items-baseline gap-2">
                    <h1 className="font-extrabold text-[16px]">Free Plan</h1>
                    <h4 className="text-[14px]">
                        Upgrade your free plan to enjoy kufuli without limits{" "}
                        <Link to="/plans" className="text-blue-600">
                            Learn more
                        </Link>
                    </h4>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-full laptop:text-sm text-xs"
                        onClick={() => navigate("/plans")}
                    >
                        <PremiumIcon />
                        Upgrade plan
                    </Button>
                </div>
                <h4 className="font-extrabold text-[16px] w-4/5"></h4>
            </div>
            {analytics.map((item: IAnalytics, index: number) => (
                <div
                    key={index}
                    className="flex flex-col justify-start items-start w-full p-4 border border-[#E0E0E0] rounded-xl"
                >
                    <div className="flex items-baseline gap-2">
                        <h1 className="font-extrabold text-[61px]">
                            {item.used}
                        </h1>
                        <h4 className="font-extrabold text-[16px]">
                            /{item.assigned}
                        </h4>
                    </div>
                    <h4 className="font-extrabold text-[16px]">{item.name}</h4>
                </div>
            ))}
            <div className="flex flex-col justify-start items-start gap-3 w-full p-4 border border-[#E0E0E0] rounded-xl">
                <h3 className="font-extrabold laptop:text-base text-xs">
                    Top performing
                </h3>
                <div className="flex items-center gap-2">
                    <img
                        src={topPerformingCampaign}
                        alt="tpc"
                        className="w-24 h-28 object-cover rounded-lg"
                    />
                    <div className="">
                        <div className="flex items-center gap-2 font-semibold text-[10px] laptop:text-sm">
                            <svg
                                width="12"
                                height="13"
                                viewBox="0 0 12 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.772 6.0225C10.924 6.23565 11 6.34225 11 6.5C11 6.65775 10.924 6.76435 10.772 6.9775C10.089 7.9353 8.3446 10 6 10C3.65539 10 1.91105 7.9353 1.22802 6.9775C1.076 6.76435 1 6.65775 1 6.5C1 6.34225 1.076 6.23565 1.22802 6.0225C1.91105 5.06472 3.65539 3 6 3C8.3446 3 10.089 5.06472 10.772 6.0225Z"
                                    stroke="#34A853"
                                    stroke-width="0.75"
                                />
                                <path
                                    d="M7.5 6.5C7.5 5.67155 6.82845 5 6 5C5.17155 5 4.5 5.67155 4.5 6.5C4.5 7.32845 5.17155 8 6 8C6.82845 8 7.5 7.32845 7.5 6.5Z"
                                    stroke="#34A853"
                                    stroke-width="0.75"
                                />
                            </svg>
                            1000 views
                        </div>
                        <div className="line-clamp-5 text-[10px] laptop:text-sm">
                            Join us on Open regist futsal championship 2024 on
                            November 30th 2024 at Golf course club...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
