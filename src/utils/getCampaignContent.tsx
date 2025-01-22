import { CreateTextStory, ICampaign } from "../interfaces/campaign.interface";

export default function getCampaignContent(campaign: ICampaign) {
    let content;
    switch (campaign.content[0].mimetype) {
        case "image":
            content = (
                <img
                    src={campaign.content[0].image}
                    alt={campaign.content[0].caption}
                    className="object-cover rounded-2xl w-full h-full"
                />
            );
            break;
        case "text":
            content = (
                <div className={`laptop:h-56 h-56 w-full`}>
                    <div
                        style={{
                            backgroundColor:
                                (campaign.content[0] as CreateTextStory)
                                    .backgroundColor ?? "#000000",
                            color: "#ffffff",
                        }}
                        className={`flex justify-center items-center p-4 laptop:p-5 object-cover rounded-2xl w-full h-full`}
                    >
                        {campaign.content[0].text}
                    </div>
                </div>
            );
            break;
        case "video":
            content = (
                <img
                    src={campaign.content[0].thumbnail}
                    alt={campaign.content[0].caption}
                    className="object-cover rounded-2xl w-full h-full"
                />
            );
            break;
        case "audio":
            content = (
                <div className="flex justify-center items-center object-cover rounded-2xl w-full h-full bg-gray-400">
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
                            strokeWidth="3.9375"
                        />
                        <path
                            d="M52.5 28.875C52.5 40.473 43.098 49.875 31.5 49.875M31.5 49.875C19.902 49.875 10.5 40.473 10.5 28.875M31.5 49.875V57.75M31.5 57.75H39.375M31.5 57.75H23.625"
                            stroke="white"
                            strokeWidth="3.9375"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            );
            break;
        default:
            break;
    }
    return content;
}
