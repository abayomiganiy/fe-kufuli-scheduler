import { ICampaign } from "../interfaces/campaign.interface";
import FontCodeToFont from "./fontCodeToFont";
import replaceUrlsWithShortened from "./shortenUrl";

export default function GetCampaignContent(campaign: ICampaign) {
    // Guard against missing messages
    if (!campaign?.messages?.length) {
        return (
            <div className="flex justify-center items-center p-4 laptop:p-5 object-cover rounded-2xl w-full h-full bg-gray-200">
                <p className="text-gray-600 text-sm">No content available</p>
            </div>
        );
    }

    const message = campaign.messages[0];
    // Guard against missing content
    if (!message?.content) {
        return (
            <div className="flex justify-center items-center p-4 laptop:p-5 object-cover rounded-2xl w-full h-full bg-gray-200">
                <p className="text-gray-600 text-sm">Invalid content</p>
            </div>
        );
    }

    let content;
    switch (true) {
        case "image" in message.content:
            if (!message.content.image?.url) {
                content = (
                    <div className="flex justify-center items-center p-4 laptop:p-5 object-cover rounded-2xl w-full h-full bg-gray-200">
                        <p className="text-gray-600 text-sm">Invalid image</p>
                    </div>
                );
                break;
            }
            content = (
                <img
                    src={
                        typeof message.content.image.url === "string"
                            ? message.content.image.url
                            : URL.createObjectURL(message.content.image.url)
                    }
                    alt={message.content.caption || "Campaign image"}
                    className="object-cover rounded-2xl w-full h-full"
                />
            );
            break;

        case "text" in message.content:
            content = (
                <div className="laptop:h-56 h-56 w-full">
                    <div
                        style={{
                            backgroundColor:
                                message.options?.backgroundColor ?? "#000000",
                            color: "#ffffff",
                            fontFamily: FontCodeToFont(
                                message.options?.font as number
                            ),
                        }}
                        className="flex justify-center items-center p-4 laptop:p-5 object-cover rounded-2xl w-full h-full"
                    >
                        {message.content.text.length > 20
                            ? `${replaceUrlsWithShortened(
                                  message.content.text.slice(0, 20)
                              )}...`
                            : replaceUrlsWithShortened(message.content.text)}
                    </div>
                </div>
            );
            break;

        case "video" in message.content:
            if (!message.content.video?.url) {
                content = (
                    <div className="flex justify-center items-center p-4 laptop:p-5 object-cover rounded-2xl w-full h-full bg-gray-200">
                        <p className="text-gray-600 text-sm">Invalid video</p>
                    </div>
                );
                break;
            }
            content = (
                <img
                    src={
                        typeof message.content.video.url === "string"
                            ? message.content.video.url
                            : URL.createObjectURL(message.content.video.url)
                    }
                    alt={message.content.caption || "Campaign video"}
                    className="object-cover rounded-2xl w-full h-full"
                />
            );
            break;

        case "audio" in message.content:
            content = (
                <div className="flex justify-center items-center object-cover rounded-2xl w-full h-full bg-gray-800">
                    <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                </div>
            );
            break;

        default:
            content = (
                <div className="flex justify-center items-center p-4 laptop:p-5 object-cover rounded-2xl w-full h-full bg-gray-200">
                    <p className="text-gray-600 text-sm">
                        Unsupported content type
                    </p>
                </div>
            );
            break;
    }

    return content;
}
