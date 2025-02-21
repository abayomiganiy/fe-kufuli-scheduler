import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { ICampaignFormInput } from "../../pages/createCampaign/CreateCampaign";
// import { useCreateCampaignContent } from "../../store/campaignStore";
import { FC } from "react";
import FontCodeToFont from "../../utils/fontCodeToFont";
import { MessageTypes } from "../../interfaces/campaign.interface";

interface CampaignContentPreviewProps {
    content: MessageTypes;
    getValues: UseFormGetValues<ICampaignFormInput>;
    // setValue: UseFormSetValue<ICampaignFormInput>;
    register: UseFormRegister<ICampaignFormInput>;
    index: number;
}

const CampaignContentPreview: FC<CampaignContentPreviewProps> = ({
    content,
    // getValues,
    register,
    index,
}) => {
    return (
        <div className="flex flex-col gap-3">
            {"text" in content.message ? (
                <div className="flex flex-col gap-3">
                    <div className="">
                        <label
                            htmlFor={`text-input-${content.id}`}
                            className="text-white w-52 h-72 rounded-lg flex items-center justify-center p-4 outline-none select-none"
                            style={{
                                backgroundColor:
                                    content.options?.backgroundColor,
                                fontFamily: FontCodeToFont(
                                    content.options!.font!
                                ),
                            }}
                        >
                            {content.message.text?.length
                                ? content.message.text
                                : "Type a message..."}
                        </label>
                    </div>
                    <textarea
                        {...register(`messages.${index}.message.text`)}
                        id={`text-input-${content.id}`}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none w-full"
                        placeholder="Type a message..."
                        rows={3}
                    />
                </div>
            ) : "image" in content.message ? (
                <div className="flex flex-col gap-3">
                    <div className="w-52 h-72 rounded-lg bg-black flex items-center justify-center p-4 outline-none select-none">
                        <img
                            src={content.message.image.url}
                            alt={content.message.image.caption}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <textarea
                        rows={3}
                        defaultValue={content.message.image.caption}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
                        placeholder="Write caption"
                        {...register(`messages.${index}.message.image.caption`)}
                        // onChange={(e) => {
                        //     updateContent({
                        //         ...content,
                        //         caption: e.target.value,
                        //     });
                        // }}
                    />
                </div>
            ) : "video" in content.message ? (
                <div className="flex flex-col gap-3">
                    <div className="w-52 h-72 rounded-lg bg-black flex items-center justify-center p-4 outline-none select-none">
                        <video
                            controls
                            controlsList="nofullscreen"
                            playsInline
                            className="w-52 h-full"
                        >
                            <source src={content.message.video.url} />
                        </video>
                    </div>
                    <textarea
                        rows={3}
                        defaultValue={content.message.video.caption}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
                        placeholder="Write caption"
                        {...register(`messages.${index}.message.video.caption`)}
                    />
                </div>
            ) : "audio" in content.message ? (
                <div className="flex flex-col gap-3">
                    <div
                        className="w-52 h-72 rounded-lg flex items-center justify-center text-white p-4 outline-none select-none"
                        style={{
                            backgroundColor: content.options?.backgroundColor,
                        }}
                    >
                        <audio controls controlsList="nofullscreen" playsInline>
                            <source
                                src={content.message.audio.url}
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
