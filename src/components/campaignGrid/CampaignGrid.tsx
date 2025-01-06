import React from "react";
import Toggle from "../toggle";
import {
    CreateImageMessage,
    CreateTextMessage,
    CreateTextStoryData,
    ICampaign,
} from "../../interfaces/campaign.interface";
import getCampaignContent from "../../utils/getCampaignContent";
import { Link } from "react-router-dom";

const CampaignGrid: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
    const content = getCampaignContent(campaign);

    let campaignIcon;
    switch (campaign.content[0].mimetype) {
        case "text":
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
                        stroke-width="0.320255"
                    />
                    <path
                        d="M14.697 19.5V12.6761H12.3255V11.3625H18.6844V12.6761H16.3245V19.5H14.697Z"
                        fill="#202020"
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
                            <stop stop-color="#4CCEF7" />
                            <stop offset="1" stop-color="#91FFDB" />
                        </linearGradient>
                    </defs>
                </svg>
            );
            break;
        case "image":
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
                        stroke-width="0.320255"
                    />
                    <path
                        d="M13.0469 14.0312C13.5905 14.0312 14.0312 13.5905 14.0312 13.0469C14.0312 12.5032 13.5905 12.0625 13.0469 12.0625C12.5032 12.0625 12.0625 12.5032 12.0625 13.0469C12.0625 13.5905 12.5032 14.0312 13.0469 14.0312Z"
                        stroke="#141B34"
                        stroke-width="0.984375"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9.76562 16C9.76562 13.0611 9.76562 11.5916 10.6786 10.6786C11.5916 9.76562 13.0611 9.76562 16 9.76562C18.9389 9.76562 20.4084 9.76562 21.3214 10.6786C22.2344 11.5916 22.2344 13.0611 22.2344 16C22.2344 18.9389 22.2344 20.4084 21.3214 21.3214C20.4084 22.2344 18.9389 22.2344 16 22.2344C13.0611 22.2344 11.5916 22.2344 10.6786 21.3214C9.76562 20.4084 9.76562 18.9389 9.76562 16Z"
                        stroke="#141B34"
                        stroke-width="0.984375"
                    />
                    <path
                        d="M11.4062 21.9062C14.2757 18.4773 17.4924 13.9552 22.2327 17.0122"
                        stroke="#141B34"
                        stroke-width="0.984375"
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
                            <stop stop-color="#4CCEF7" />
                            <stop offset="1" stop-color="#91FFDB" />
                        </linearGradient>
                    </defs>
                </svg>
            );
            break;
        case "video":
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
                        fill="url(#paint0_linear_227_13032)"
                    />
                    <rect
                        x="0.160128"
                        y="0.160128"
                        width="31.6797"
                        height="31.6797"
                        rx="5.83987"
                        stroke="#E0E0E0"
                        stroke-width="0.320255"
                    />
                    <path
                        d="M9.4375 15.3438C9.4375 13.1782 9.4375 12.0955 10.1102 11.4227C10.783 10.75 11.8657 10.75 14.0312 10.75H14.6875C16.853 10.75 17.9357 10.75 18.6085 11.4227C19.2813 12.0955 19.2812 13.1782 19.2812 15.3438V16.6562C19.2812 18.8217 19.2813 19.9045 18.6085 20.5773C17.9357 21.25 16.853 21.25 14.6875 21.25H14.0312C11.8657 21.25 10.783 21.25 10.1102 20.5773C9.4375 19.9045 9.4375 18.8217 9.4375 16.6562V15.3438Z"
                        stroke="#141B34"
                        stroke-width="0.984375"
                    />
                    <path
                        d="M19.2812 13.9695L19.3639 13.9013C20.7524 12.7557 21.4466 12.1828 22.0046 12.4594C22.5625 12.736 22.5625 13.653 22.5625 15.4869V16.5131C22.5625 18.3471 22.5625 19.264 22.0046 19.5406C21.4466 19.8171 20.7524 19.2444 19.3639 18.0987L19.2812 18.0305"
                        stroke="#141B34"
                        stroke-width="0.984375"
                        stroke-linecap="round"
                    />
                    <path
                        d="M15.6719 15.3438C16.2155 15.3438 16.6562 14.903 16.6562 14.3594C16.6562 13.8157 16.2155 13.375 15.6719 13.375C15.1282 13.375 14.6875 13.8157 14.6875 14.3594C14.6875 14.903 15.1282 15.3438 15.6719 15.3438Z"
                        stroke="#141B34"
                        stroke-width="0.984375"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_227_13032"
                            x1="7.59446"
                            y1="39.5605"
                            x2="16.5624"
                            y2="-0.469425"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#4CCEF7" />
                            <stop offset="1" stop-color="#91FFDB" />
                        </linearGradient>
                    </defs>
                </svg>
            );
            break;
        case "audio":
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
                        stroke-width="0.320255"
                    />
                    <path
                        d="M19.7503 12.2498V15.25C19.7503 17.3211 18.0713 19.0001 16.0002 19.0001C13.929 19.0001 12.25 17.3211 12.25 15.25V12.2498C12.25 10.1787 13.929 8.49966 16.0002 8.49966C18.0713 8.49966 19.7503 10.1787 19.7503 12.2498Z"
                        stroke="#141B34"
                        stroke-width="1.12505"
                    />
                    <path
                        d="M22.0005 15.25C22.0005 18.5638 19.3141 21.2502 16.0003 21.2502M16.0003 21.2502C12.6864 21.2502 10 18.5638 10 15.25M16.0003 21.2502V23.5003M16.0003 23.5003H18.2504M16.0003 23.5003H13.7502"
                        stroke="#141B34"
                        stroke-width="1.12505"
                        stroke-linecap="round"
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
                            <stop stop-color="#4CCEF7" />
                            <stop offset="1" stop-color="#91FFDB" />
                        </linearGradient>
                    </defs>
                </svg>
            );
            break;
        default:
            break;
    }

    return (
        <div className="flex flex-col items-center space-y-2">
            <Link to={campaign.id} state={campaign} className="relative laptop:h-56 h-56 w-full">
                <div className="absolute bottom-3 right-3">{campaignIcon}</div>
                {content}
            </Link>
            <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Toggle isOn={campaign.status === "active"} />
                    <div className="bg-[#F2F4FC] text-[#205CE2] font-bold text-xs rounded py-1 px-2">Upcoming</div>
                </div>
                <div className="font-medium text-xs laptop:text-sm line-clamp-2">
                    {(campaign.content[0] as CreateImageMessage).caption ??
                        (
                            campaign.content[0] as
                                | CreateTextMessage
                                | CreateTextStoryData
                        ).text}
                </div>
                <div className="flex items-center gap-2 mt-auto">
                    <div className="flex justify-center items-center gap-1">
                        <h3 className="font-semibold text-xs laptop:text-sm">
                            {campaign.content[0].views}
                        </h3>
                        <span className="font-light text-xs laptop:text-sm">
                            views
                        </span>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                        <h5 className="font-medium text-xs laptop:text-sm">
                            {"Daily"}
                        </h5>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                        <h5 className="font-medium text-xs laptop:text-sm">
                            {"5:30pm"}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignGrid;
