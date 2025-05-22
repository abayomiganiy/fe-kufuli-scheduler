import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { ICampaign } from "../../interfaces/campaign.interface";
import getCampaignContent from "../../utils/getCampaignContent";
import Toggle from "../toggle";

const CampaignGrid: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
    if (!campaign?.messages?.length) {
        return null;
    }

    const content = getCampaignContent(campaign);
    const message = campaign.messages[0];

    let campaignIcon;
    if (message?.content) {
        switch (true) {
            case "text" in message.content:
                campaignIcon = (
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.160128"
                            y="0.160128"
                            width="31.6797"
                            height="31.6797"
                            rx="5.83987"
                            fill="url(#paint0_linear_227_13011)"
                        />
                        <rect
                            x="0.160128"
                            y="0.160128"
                            width="31.6797"
                            height="31.6797"
                            rx="5.83987"
                            stroke="#E0E0E0"
                            strokeWidth="0.320255"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_227_13011"
                                x1="7.59446"
                                y1="39.5605"
                                x2="16.5624"
                                y2="-0.469425"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4CCEF7" />
                                <stop offset="1" stopColor="#91FFDB" />
                            </linearGradient>
                        </defs>
                    </svg>
                );
                break;
            case "image" in message.content:
                campaignIcon = (
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.160128"
                            y="0.160128"
                            width="31.6797"
                            height="31.6797"
                            rx="5.83987"
                            fill="url(#paint0_linear_227_13035)"
                        />
                        <rect
                            x="0.160128"
                            y="0.160128"
                            width="31.6797"
                            height="31.6797"
                            rx="5.83987"
                            stroke="#E0E0E0"
                            strokeWidth="0.320255"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_227_13035"
                                x1="7.59446"
                                y1="39.5605"
                                x2="16.5624"
                                y2="-0.469425"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4CCEF7" />
                                <stop offset="1" stopColor="#91FFDB" />
                            </linearGradient>
                        </defs>
                    </svg>
                );
                break;
            case "video" in message.content:
                campaignIcon = (
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.160128"
                            y="0.160128"
                            width="31.6797"
                            height="31.6797"
                            rx="5.83987"
                            fill="url(#paint0_linear_227_13082)"
                        />
                        <rect
                            x="0.160128"
                            y="0.160128"
                            width="31.6797"
                            height="31.6797"
                            rx="5.83987"
                            stroke="#E0E0E0"
                            strokeWidth="0.320255"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_227_13082"
                                x1="7.59446"
                                y1="39.5605"
                                x2="16.5624"
                                y2="-0.469425"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4CCEF7" />
                                <stop offset="1" stopColor="#91FFDB" />
                            </linearGradient>
                        </defs>
                    </svg>
                );
                break;
            case "audio" in message.content:
                campaignIcon = (
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.160128"
                            y="0.160128"
                            width="31.6797"
                            height="31.6797"
                            rx="5.83987"
                            fill="url(#paint0_linear_227_13082)"
                        />
                        <rect
                            x="0.160128"
                            y="0.160128"
                            width="31.6797"
                            height="31.6797"
                            rx="5.83987"
                            stroke="#E0E0E0"
                            strokeWidth="0.320255"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_227_13082"
                                x1="7.59446"
                                y1="39.5605"
                                x2="16.5624"
                                y2="-0.469425"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4CCEF7" />
                                <stop offset="1" stopColor="#91FFDB" />
                            </linearGradient>
                        </defs>
                    </svg>
                );
                break;
            default:
                break;
        }
    }

    return (
        <div className="flex flex-col items-center space-y-2">
            <Link
                to={`/campaigns/${campaign.id}`}
                state={campaign}
                className="relative laptop:h-56 h-56 w-full flex-wrap"
            >
                <div className="absolute bottom-3 right-3">{campaignIcon}</div>
                {content}
            </Link>
            <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Toggle isOn={campaign.isActive} />
                    <div className="bg-[#F2F4FC] text-[#205CE2] font-bold text-xs rounded py-1 px-2">
                        Upcoming
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                    <div className="flex justify-center items-center gap-1">
                        <h3 className="font-semibold text-xs laptop:text-sm">
                            {100}
                        </h3>
                        <span className="font-light text-xs laptop:text-sm">
                            views
                        </span>
                    </div>
                    <div className="rounded-full h-1 w-1 bg-black"></div>
                    <div className="flex justify-center items-center gap-1">
                        <h5 className="font-medium text-xs laptop:text-sm">
                            {campaign.frequency}
                        </h5>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                        <h5 className="font-medium text-xs laptop:text-sm">
                            {format(campaign.scheduledTime, "hh:mm a")}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignGrid;
