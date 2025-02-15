import React, { useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
    CreateTextStory,
    ICreateCampaignContent,
} from "../../interfaces/campaign.interface";
import { ICampaignFormInput } from "../../pages/createCampaign/CreateCampaign";
import { useCreateCampaignContent } from "../../store/campaignStore";
import FontCodeToFont from "../../utils/fontCodeToFont";
import generateHexColor from "../../utils/generateHexColor";

const CampaingPreviewActions: React.FC<{
    content: ICreateCampaignContent;
    setValue: UseFormSetValue<ICampaignFormInput>;
    index: number;
}> = ({ content, setValue, index }) => {
    const [bgIndex, setBgIndex] = useState(0);
    const fontOptions = useMemo(() => [0, 8, 9, 10], []);
    const { removeContent, updateContent } = useCreateCampaignContent(
        (state) => state
    );

    return (
        <div className="absolute px-2 top-2 w-full flex justify-between gap-2">
            <div
                className=" cursor-pointer shadow-2xl bg-gray-600 text-white h-8 opacity-90 w-8 rounded-full flex justify-center items-center"
                onClick={() => {
                    removeContent(content.id);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                >
                    <g
                        width="100%"
                        height="100%"
                        transform="matrix(1,0,0,1,0,0)"
                    >
                        <path
                            d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"
                            fill="#ffffff"
                            fillOpacity="1"
                            data-original-color="#000000ff"
                            stroke="none"
                            strokeOpacity="1"
                        />
                    </g>
                </svg>
            </div>
            <div className="flex gap-2">
                {content.mimetype === "text" && (
                    <div
                        className=" cursor-pointer shadow-2xl bg-gray-600 text-white h-8 opacity-90 w-8 rounded-full flex justify-center items-center select-none"
                        onClick={() => {
                            const newIndex = (bgIndex + 1) % fontOptions.length;
                            setBgIndex(newIndex);
                            updateContent({
                                ...content,
                                font: fontOptions[newIndex],
                            });
                        }}
                        style={{
                            fontFamily: FontCodeToFont(
                                (content as unknown as CreateTextStory).font
                            ),
                        }}
                    >
                        T
                    </div>
                )}
                {(content.mimetype === "text" ||
                    content.mimetype === "audio") && (
                    <div
                        className=" cursor-pointer shadow-2xl bg-gray-600 text-white h-8 opacity-90 w-8 rounded-full flex justify-center items-center"
                        onClick={() => {
                            const backgroundColor = generateHexColor();
                            setValue(
                                `messages.${index}.backgroundColor`,
                                backgroundColor
                            );
                            updateContent({
                                ...content,
                                backgroundColor,
                            });
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Outline"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            stroke="#FFFFFF"
                            fill="#FFFFFF"
                        >
                            <g
                                width="100%"
                                height="100%"
                                transform="matrix(1,0,0,1,0,0)"
                            >
                                <path
                                    d="M17.115,8.05A1.5,1.5,0,1,0,18.95,9.115,1.5,1.5,0,0,0,17.115,8.05Z"
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    data-original-color="#000000ff"
                                    stroke="none"
                                    strokeOpacity="1"
                                />
                                <path
                                    d="M12.115,5.05A1.5,1.5,0,1,0,13.95,6.115,1.5,1.5,0,0,0,12.115,5.05Z"
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    data-original-color="#000000ff"
                                    stroke="none"
                                    strokeOpacity="1"
                                />
                                <path
                                    d="M7.115,8.05A1.5,1.5,0,1,0,8.95,9.115,1.5,1.5,0,0,0,7.115,8.05Z"
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    data-original-color="#000000ff"
                                    stroke="none"
                                    strokeOpacity="1"
                                />
                                <path
                                    d="M7.115,14.05A1.5,1.5,0,1,0,8.95,15.115,1.5,1.5,0,0,0,7.115,14.05Z"
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    data-original-color="#000000ff"
                                    stroke="none"
                                    strokeOpacity="1"
                                />
                                <path
                                    d="M12.5.007A12,12,0,0,0,.083,12a12.014,12.014,0,0,0,12,12c.338,0,.67-.022,1-.05a1,1,0,0,0,.916-1l-.032-3.588A3.567,3.567,0,0,1,20.057,16.8l.1.1a1.912,1.912,0,0,0,1.769.521,1.888,1.888,0,0,0,1.377-1.177A11.924,11.924,0,0,0,24.08,11.7,12.155,12.155,0,0,0,12.5.007Zm8.982,15.4-.014-.014a5.567,5.567,0,0,0-9.5,3.985L11.992,22a10,10,0,0,1,.09-20c.117,0,.235,0,.353.006a10.127,10.127,0,0,1,9.645,9.743A9.892,9.892,0,0,1,21.485,15.4Z"
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    data-original-color="#000000ff"
                                    stroke="none"
                                    strokeOpacity="1"
                                />
                            </g>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaingPreviewActions;
