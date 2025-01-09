import { CreateAudioStory, CreateImageMessage, CreateTextStory, ICreateCampaignContent } from "../../interfaces/campaign.interface";
import { useCreateCampaignContent } from "../../store/campaignStore";

const CampaignContentPreview: React.FC<{
    content: ICreateCampaignContent;
}> = ({ content }) => {
    const { removeContent } = useCreateCampaignContent((state) => state);
    return (
        <div className="relative">
            <div>
                <div
                    className="absolute right-2 top-2 shadow-2xl bg-red-500 text-white h-6 w-6 rounded-full flex justify-center items-center"
                    onClick={() => {
                        removeContent(content.id);
                    }}
                >
                    x
                </div>
            </div>
            {content.mimetype === "image" || content.mimetype === "video" ? (
                <div className="flex flex-col gap-3">
                    <img
                        src={(content as CreateImageMessage).image}
                        alt={(content as CreateImageMessage).caption}
                        className="w-52 h-72 object-cover rounded-lg"
                    />
                    <textarea
                        rows={3}
                        defaultValue={(content as CreateImageMessage).caption}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
                        placeholder="Write caption"
                    />
                </div>
            ) : content.mimetype === "text" ? (
                <div className="flex flex-col gap-3">
                    <div
                        contentEditable={true}
                        autoFocus={true}
                        className="w-52 h-72 rounded-lg flex items-center justify-center text-white p-4 outline-none"
                        style={{
                            backgroundColor:
                                (content as CreateTextStory).backgroundColor ??
                                "black",
                        }}
                    >
                        {content.text}
                    </div>
                </div>
            ) : content.mimetype === "audio" ? (
                <div className="flex flex-col gap-3">
                    <div
                        contentEditable={true}
                        autoFocus={true}
                        aria-placeholder="Type a story"
                        className="w-52 h-72 rounded-lg flex items-center justify-center text-white p-4 outline-none"
                        style={{
                            backgroundColor:
                                (content as CreateAudioStory).backgroundColor ??
                                "black",
                        }}
                    >
                        audio
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CampaignContentPreview;