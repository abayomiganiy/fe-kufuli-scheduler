import React from "react";
import { useLocation } from "react-router-dom";
import SectionHeader from "../../components/sectionHeader";
import {
    CreateImageMessage,
    ICampaign,
} from "../../interfaces/campaign.interface";
import Toggle from "../../components/toggle";
import Button from "../../components/button";

const Campaign: React.FC = () => {
    const { state }: { state: ICampaign } = useLocation();
    return (
        <div className="pb-10">
            <SectionHeader title="Campaign Details" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>Status</div>
                    <div>
                        <Toggle isOn={state.status === "active"} />
                    </div>
                </div>
                <div className="flex flex-col  justify-center gap-6">
                    <img
                        src={(state.content[0] as CreateImageMessage).image}
                        alt={state.id}
                        className="h-96 w-64 object-cover rounded-2xl mx-auto"
                    />
                    <div>
                        <div>Caption</div>
                        <div>
                            {(state.content[0] as CreateImageMessage).caption}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                        <div className="flex justify-center items-center gap-1">
                            <h3 className="font-semibold text-xs laptop:text-sm flex items-center">
                                <svg
                                    width="24"
                                    height="23"
                                    viewBox="0 0 24 23"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20.9475 10.4494C21.2325 10.8491 21.375 11.0489 21.375 11.3447C21.375 11.6405 21.2325 11.8404 20.9475 12.24C19.6668 14.0359 16.3961 17.9072 12 17.9072C7.60386 17.9072 4.33322 14.0359 3.05254 12.24C2.76751 11.8404 2.625 11.6405 2.625 11.3447C2.625 11.0489 2.76751 10.8491 3.05254 10.4494C4.33322 8.65358 7.60386 4.78223 12 4.78223C16.3961 4.78223 19.6668 8.65358 20.9475 10.4494Z"
                                        stroke="#202020"
                                        stroke-width="1.40625"
                                    />
                                    <path
                                        d="M14.8145 11.3447C14.8145 9.79138 13.5553 8.53223 12.002 8.53223C10.4486 8.53223 9.18945 9.79138 9.18945 11.3447C9.18945 12.8981 10.4486 14.1572 12.002 14.1572C13.5553 14.1572 14.8145 12.8981 14.8145 11.3447Z"
                                        stroke="#202020"
                                        stroke-width="1.40625"
                                    />
                                </svg>
                                {state.content[0].views}
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
                    <div>
                        <div className="flex">
                            <span>Date created</span>{" "}
                            <h4>{state.createdAt?.getDate()}</h4>
                        </div>
                        <div className="flex">
                            <span>Cummulative views</span> <h4>{150}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <Button variant="secondary" className="w-full items-center">
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.64785 4.96185L10.762 3.84767C12.0166 2.59313 13.659 2.07276 15.3972 1.98772C16.0733 1.95465 16.4113 1.93811 16.6824 2.20919C16.9535 2.48026 16.9369 2.8183 16.9039 3.4944C16.8188 5.2326 16.2985 6.87504 15.0439 8.12955L13.9297 9.24375C13.0122 10.1613 12.7513 10.4222 12.9439 11.4175C13.1341 12.1778 13.318 12.914 12.7652 13.4668C12.0946 14.1374 11.4829 14.1374 10.8124 13.4668L5.42481 8.07923C4.75424 7.40864 4.75422 6.79695 5.42481 6.12637C5.97763 5.57355 6.71384 5.75756 7.4741 5.94765C8.46937 6.14028 8.7303 5.8794 9.64785 4.96185Z"
                                stroke="white"
                                stroke-width="1.125"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M13.543 5.34473H13.5497"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M2.67188 16.2197L6.42188 12.4697"
                                stroke="white"
                                stroke-width="1.125"
                                stroke-linecap="round"
                            />
                            <path
                                d="M7.17188 16.2197L8.67188 14.7197"
                                stroke="white"
                                stroke-width="1.125"
                                stroke-linecap="round"
                            />
                            <path
                                d="M2.67188 11.7197L4.17188 10.2197"
                                stroke="white"
                                stroke-width="1.125"
                                stroke-linecap="round"
                            />
                        </svg>
                        Boost campaign
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Campaign;
