import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ICampaign } from "../../interfaces/campaign.interface";
import Toggle from "../../components/toggle";
import Button from "../../components/button";
import FontCodeToFont from "../../utils/fontCodeToFont";
import replaceUrlsWithShortened from "../../utils/shortenUrl";
import { useDeleteCampaign } from "../../hooks/campaign.hook";

const Campaign: React.FC = () => {
    const navigate = useNavigate();
    const { state }: { state: ICampaign } = useLocation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const { mutate: deleteCampaign, isPending: deleteCampaignIsPending } =
        useDeleteCampaign();
    const carouselRef = useRef<HTMLDivElement>(null);

    // Handle missing campaign data
    if (!state || !state.messages?.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full text-center p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Campaign Not Found
                    </h1>
                    <p className="text-gray-700 mb-6">
                        The campaign you're looking for doesn't exist or has no
                        content.
                    </p>
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            </div>
        );
    }

    const totalMessages = state.messages.length;

    const scrollToMessage = (index: number) => {
        if (carouselRef.current) {
            const scrollAmount = index * 272; // 272 = width (256px) + gap (16px)
            carouselRef.current.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
        setCurrentIndex(index);
    };

    const handlePrevious = () => {
        const newIndex =
            currentIndex > 0 ? currentIndex - 1 : totalMessages - 1;
        scrollToMessage(newIndex);
    };

    const handleNext = () => {
        const newIndex =
            currentIndex < totalMessages - 1 ? currentIndex + 1 : 0;
        scrollToMessage(newIndex);
    };

    const renderMessageContent = (
        message: ICampaign["messages"][0],
        index: number
    ) => {
        if (!message?.content) {
            return (
                <div className="flex justify-center items-center h-96 w-64 bg-gray-200 rounded-2xl">
                    <p className="text-gray-600">Invalid content</p>
                </div>
            );
        }

        if ("text" in message.content) {
            return (
                <div
                    className="flex justify-center items-center h-96 w-64 object-cover rounded-2xl mx-auto laptop:mx-0 text-white"
                    style={{
                        backgroundColor: message.options?.backgroundColor,
                        fontFamily: FontCodeToFont(
                            message.options?.font as number
                        ),
                    }}
                >
                    {replaceUrlsWithShortened(message.content.text)}
                </div>
            );
        }

        if ("image" in message.content && message.content.image?.url) {
            return (
                <img
                    src={
                        typeof message.content.image.url === "string"
                            ? message.content.image.url
                            : URL.createObjectURL(message.content.image.url)
                    }
                    alt={`message-${index}`}
                    className="h-96 w-64 object-cover rounded-2xl mx-auto laptop:mx-0"
                />
            );
        }

        if ("video" in message.content && message.content.video?.url) {
            return (
                <img
                    src={
                        typeof message.content.video.url === "string"
                            ? message.content.video.url
                            : URL.createObjectURL(message.content.video.url)
                    }
                    alt={`message-${index}`}
                    className="h-96 w-64 object-cover rounded-2xl mx-auto laptop:mx-0"
                />
            );
        }

        if ("audio" in message.content) {
            return (
                <div className="flex justify-center items-center h-96 w-64 bg-gray-800 rounded-2xl">
                    <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                </div>
            );
        }

        return (
            <div className="flex justify-center items-center h-96 w-64 bg-gray-200 rounded-2xl">
                <p className="text-gray-600">Unsupported content type</p>
            </div>
        );
    };

    return (
        <div className="pb-10">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>Status</div>
                    <div>
                        <Toggle isOn={state.status === "active"} />
                    </div>
                </div>
                <div className="flex flex-col laptop:flex-row justify-center laptop:justify-start gap-6">
                    <div className="relative">
                        {totalMessages > 1 && (
                            <>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md"
                                    aria-label="Previous message"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 18L9 12L15 6"
                                            stroke="#202020"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md"
                                    aria-label="Next message"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9 6L15 12L9 18"
                                            stroke="#202020"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </>
                        )}

                        <div
                            ref={carouselRef}
                            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            {state.messages.map((message, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-64 snap-center mr-4"
                                >
                                    {renderMessageContent(message, index)}
                                </div>
                            ))}
                        </div>

                        {totalMessages > 1 && (
                            <div className="flex justify-center mt-4 gap-2">
                                {Array.from({ length: totalMessages }).map(
                                    (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                scrollToMessage(index)
                                            }
                                            className={`h-2 rounded-full transition-all ${
                                                currentIndex === index
                                                    ? "w-4 bg-blue-600"
                                                    : "w-2 bg-gray-300"
                                            }`}
                                            aria-label={`Go to message ${
                                                index + 1
                                            }`}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2 my-4">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Are you sure you want to delete campaign?"
                                        )
                                    ) {
                                        deleteCampaign(state.id);
                                    }
                                }}
                                className="w-full laptop:w-auto items-center"
                                disabled={deleteCampaignIsPending}
                            >
                                Delete Campaign
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => {}}
                                className="w-full laptop:w-auto items-center"
                            >
                                Edit Campaign
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Campaign;
