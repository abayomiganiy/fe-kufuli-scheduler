import { UseFormGetValues } from "react-hook-form";
import {
    CreateAudioMessage,
    CreateAudioStory,
    CreateImageMessage,
    CreateTextStory,
    CreateVideoMessage,
    ICreateCampaignContent,
} from "../../interfaces/campaign.interface";
import { IFormInput } from "../../pages/createCampaign/CreateCampaign";
import { useCreateCampaignContent } from "../../store/campaignStore";
import FontCodeToFont from "../../utils/fontCodeToFont";

interface CampaignContentPreviewProps {
    content: ICreateCampaignContent;
    getValues: UseFormGetValues<IFormInput>;
}

const CampaignContentPreview = ({
    content,
    getValues,
}: CampaignContentPreviewProps) => {
    const { updateContent } = useCreateCampaignContent((state) => state);

    const values = getValues();

    console.log(values);

    return (
        <div>
            {content.mimetype === "text" ? (
                <label
                    htmlFor={`text-input-${content.id}`}
                    className="w-52 h-72 rounded-lg flex items-center justify-center text-white p-4 outline-none select-none"
                    style={{
                        backgroundColor: (content as CreateTextStory)
                            .backgroundColor,
                        fontFamily: FontCodeToFont(
                            (content as CreateTextStory).font
                        ),
                    }}
                >
                    {(content as CreateTextStory).text?.length
                        ? (content as CreateTextStory).text
                        : "Type a message..."}
                </label>
            ) : content.mimetype === "image" ? (
                <div className="w-52 h-72 bg-gray-800 rounded-lg">
                    <img
                        src={(content as CreateImageMessage).image}
                        alt={(content as CreateImageMessage).caption}
                        className="w-full h-full object-contain"
                    />
                </div>
            ) : // <textarea
            //     rows={3}
            //     defaultValue={(content as CreateImageMessage).caption}
            //     className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
            //     placeholder="Write caption"
            //     onChange={(e) => {
            //         updateContent({
            //             ...content,
            //             caption: e.target.value,
            //         });
            //     }}
            // />
            content.mimetype === "video" ? (
                <div className="flex flex-col gap-3">
                    <div className="w-52 h-72 rounded-lg bg-black flex items-center justify-center p-4 outline-none select-none">
                        <video
                            controls
                            controlsList="nofullscreen"
                            playsInline
                            className="w-52 h-full"
                        >
                            <source
                                src={(content as CreateVideoMessage).video}
                            />
                        </video>
                    </div>
                    <textarea
                        rows={3}
                        defaultValue={(content as CreateVideoMessage).caption}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
                        placeholder="Write caption"
                        onChange={(e) => {
                            updateContent({
                                ...content,
                                caption: e.target.value,
                            });
                        }}
                    />
                </div>
            ) : content.mimetype === "audio" ? (
                <div className="flex flex-col gap-3">
                    <div
                        className="w-52 h-72 rounded-lg flex items-center justify-center text-white p-4 outline-none select-none"
                        style={{
                            backgroundColor: (content as CreateAudioStory)
                                .backgroundColor,
                        }}
                    >
                        <audio controls controlsList="nofullscreen" playsInline>
                            <source
                                src={
                                    (
                                        content as
                                            | CreateAudioMessage
                                            | CreateAudioStory
                                    ).audio
                                }
                                type="audio/mpeg"
                            />
                        </audio>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CampaignContentPreview;
