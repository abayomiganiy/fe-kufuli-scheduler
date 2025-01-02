import React from "react";
import { IActiveCampaign } from "../../interfaces/campaign.interface";
import { useGetCampaigns } from "../../hooks/campaign.hook";

const ActiveCampaigns: React.FC = () => {
    const { data: activeCampaigns, isLoading: activeCampaignsIsLoading } =
        useGetCampaigns();

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
                    <ActiveCampaign key={index} campaign={campaign} />
                ))}
            </div>
        </div>
    );
};

const ActiveCampaign: React.FC<{ campaign?: IActiveCampaign }> = ({
    campaign,
}) => {
    return (
        <div className="relative laptop:w-40 w-32 laptop:h-64 h-48 flex cursor-pointer items-end justify-between p-4 rounded-2xl text-white">
            <>
                <img
                    src={campaign?.image}
                    alt={campaign?.title}
                    className="w-full h-full absolute top-0 left-0 object-cover rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-t from-0 from-black to-50% to-transparent opacity-80" />
            </>
            <div className="ml-4 z-40">
                <h3 className="text-sm font-medium">{campaign?.title}</h3>
            </div>
        </div>
    );
};

const ActiveCampaignLoading: React.FC = () => {
    return (
        <div className="relative animate-pulse laptop:w-40 w-32 laptop:h-64 h-48 flex cursor-pointer items-end justify-between p-4 rounded-2xl text-white">
            <div className="w-full h-full flex justify-center items-center bg-[#E5E5E5] absolute top-0 left-0 object-cover rounded-2xl">
                <svg
                    width="43"
                    height="42"
                    viewBox="0 0 43 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.625 15.75C15.0747 15.75 16.25 14.5747 16.25 13.125C16.25 11.6753 15.0747 10.5 13.625 10.5C12.1753 10.5 11 11.6753 11 13.125C11 14.5747 12.1753 15.75 13.625 15.75Z"
                        stroke="#141B34"
                        stroke-width="2.625"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M4.875 21C4.875 13.1629 4.875 9.24436 7.30967 6.80967C9.74436 4.375 13.6629 4.375 21.5 4.375C29.337 4.375 33.2556 4.375 35.6904 6.80967C38.125 9.24436 38.125 13.1629 38.125 21C38.125 28.837 38.125 32.7556 35.6904 35.1904C33.2556 37.625 29.337 37.625 21.5 37.625C13.6629 37.625 9.74436 37.625 7.30967 35.1904C4.875 32.7556 4.875 28.837 4.875 21Z"
                        stroke="#141B34"
                        stroke-width="2.625"
                    />
                    <path
                        d="M9.25 36.75C16.9018 27.6062 25.4797 15.5471 38.1206 23.6992"
                        stroke="#141B34"
                        stroke-width="2.625"
                    />
                </svg>
            </div>
            <div className="z-40 h-2 w-full bg-gray-500 rounded" />
        </div>
    );
};

export default ActiveCampaigns;
