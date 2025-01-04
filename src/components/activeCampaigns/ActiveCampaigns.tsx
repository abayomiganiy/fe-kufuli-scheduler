import React from "react";
import { useGetCampaigns } from "../../hooks/campaign.hook";
import {
    CreateImageMessage,
    CreateTextStoryData,
    ICampaign,
} from "../../interfaces/campaign.interface";

const ActiveCampaigns: React.FC = () => {
    const { data: activeCampaigns, isLoading: activeCampaignsIsLoading } =
        useGetCampaigns({ status: "active" });

    if (activeCampaignsIsLoading) {
        return (
            <div className="flex overflow-auto no-scrollbar">
                <div className="flex gap-4 flex-nowrap">
                    {[1, 2, 3]?.map((_, index) => (
                        <ActiveCampaignLoading key={index} />
                    ))}
                </div>
            </div>
        );
    }

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
                {activeCampaigns?.map((campaign, index) => (
                    <ActiveCampaign key={index} campaign={campaign!} />
                ))}
            </div>
        </div>
    );
};

const ActiveCampaign: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
    let content;
    switch (campaign.content[0].mimetype) {
        case "image":
            content = (
                <img
                    src={campaign.content[0]?.image}
                    alt={campaign.content[0]?.caption}
                    className="w-full h-full absolute top-0 left-0 object-cover rounded-2xl"
                />
            );
            break;
        case "text":
            content = (
                <div
                    className={`flex items-center justify-center p-4 laptop:p-5 w-full h-full absolute top-0 left-0 object-cover rounded-2xl bg-[${
                        (campaign.content[0] as CreateTextStoryData)
                            .backgroundColor ?? "#000000"
                    }]`}
                >
                    {campaign.content[0].text}
                </div>
            );
            break;
        case "video":
            content = (
                <img
                    src={campaign.content[0].thumbnail}
                    alt={campaign.content[0].caption}
                    className="w-full h-full absolute top-0 left-0 object-cover rounded-2xl"
                />
            );
            break;
        case "audio":
            content = (
                <div className="w-full h-full absolute top-0 left-0 object-cover rounded-2xl flex justify-center items-center bg-gray-400">
                    <svg
                        width="63"
                        height="63"
                        viewBox="0 0 63 63"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="object-cover rounded-lg w-12 h-16 bg-gray-400"
                    >
                        <path
                            d="M44.625 18.375V28.875C44.625 36.1237 38.7487 42 31.5 42C24.2513 42 18.375 36.1237 18.375 28.875V18.375C18.375 11.1263 24.2513 5.25 31.5 5.25C38.7487 5.25 44.625 11.1263 44.625 18.375Z"
                            stroke="white"
                            stroke-width="3.9375"
                        />
                        <path
                            d="M52.5 28.875C52.5 40.473 43.098 49.875 31.5 49.875M31.5 49.875C19.902 49.875 10.5 40.473 10.5 28.875M31.5 49.875V57.75M31.5 57.75H39.375M31.5 57.75H23.625"
                            stroke="white"
                            stroke-width="3.9375"
                            stroke-linecap="round"
                        />
                    </svg>
                </div>
            );
            break;
        default:
            break;
    }

    return (
        <div className="relative laptop:w-40 w-32 laptop:h-64 h-48 flex cursor-pointer items-end justify-between p-4 rounded-2xl text-white">
            {content}
            {campaign.content[0].mimetype !== "text" && <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-t from-0 from-black to-50% to-transparent opacity-80" />}
            <div className="z-40">
                <h3 className="text-sm font-medium line-clamp-1">
                    {(campaign.content[0] as CreateImageMessage).caption}
                </h3>
            </div>
        </div>
    );
};

const ActiveCampaignLoading: React.FC = () => {
    return (
        <div className="relative animate-pulse laptop:w-40 w-32 laptop:h-64 h-48 flex cursor-pointer items-end justify-between p-4 rounded-2xl text-white">
            <div className="w-full h-full flex justify-center items-center bg-[#E5E5E5] absolute top-0 left-0 object-cover rounded-2xl">
                <svg
                    width="36"
                    height="37"
                    viewBox="0 0 36 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.5 22.9598C4.5 18.7465 4.5 16.6397 5.51118 15.1264C5.94894 14.4713 6.51144 13.9088 7.16658 13.471C8.67992 12.4598 10.7866 12.4598 15 12.4598H21C25.2134 12.4598 27.3201 12.4598 28.8334 13.471C29.4885 13.9088 30.051 14.4713 30.4888 15.1264C31.5 16.6397 31.5 18.7465 31.5 22.9598C31.5 27.1732 31.5 29.2799 30.4888 30.7933C30.051 31.4483 29.4885 32.0108 28.8334 32.4487C27.3201 33.4598 25.2134 33.4598 21 33.4598H15C10.7866 33.4598 8.67992 33.4598 7.16658 32.4487C6.51144 32.0108 5.94894 31.4483 5.51118 30.7933C4.5 29.2799 4.5 27.1732 4.5 22.9598Z"
                        stroke="#6b7280"
                        stroke-width="2.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M22.8246 23.5777C22.6125 24.3835 21.6103 24.9529 19.6057 26.0918C17.6678 27.1927 16.699 27.7432 15.9181 27.5219C15.5953 27.4304 15.3012 27.2567 15.064 27.0173C14.4902 26.4385 14.4902 25.3157 14.4902 23.0701C14.4902 20.8246 14.4902 19.7018 15.064 19.1229C15.3012 18.8836 15.5953 18.7099 15.9181 18.6184C16.699 18.3971 17.6678 18.9476 19.6057 20.0485C21.6103 21.1873 22.6125 21.7567 22.8246 22.5625C22.9121 22.8952 22.9121 23.2451 22.8246 23.5777Z"
                        stroke="#6b7280"
                        stroke-width="1.8"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M28.5 12.4598C28.4732 10.6002 28.335 9.54583 27.6273 8.83852C26.7481 7.95984 25.3332 7.95984 22.5033 7.95984H13.4967C10.6668 7.95984 9.25179 7.95984 8.37264 8.83852C7.66494 9.54583 7.52691 10.6002 7.5 12.4598"
                        stroke="#6b7280"
                        stroke-width="2.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M25.5 7.95984C25.5 6.56202 25.5 5.86311 25.2717 5.31178C24.9672 4.57671 24.3831 3.99268 23.6481 3.6882C23.0967 3.45984 22.3979 3.45984 21 3.45984H15C13.6022 3.45984 12.9033 3.45984 12.3519 3.6882C11.6169 3.99268 11.0328 4.57671 10.7284 5.31178C10.5 5.86311 10.5 6.56202 10.5 7.95984"
                        stroke="#6b7280"
                        stroke-width="2.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div className="z-40 h-2 w-full bg-gray-500 rounded" />
        </div>
    );
};

export default ActiveCampaigns;
