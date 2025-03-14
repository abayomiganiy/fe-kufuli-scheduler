import { FC } from "react";
import {
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormWatch,
} from "react-hook-form";
import {
    ICampaignFormInput,
    MessageTypes,
} from "../../interfaces/campaign.interface";
import FontCodeToFont from "../../utils/fontCodeToFont";

interface CampaignContentPreviewProps {
    content: MessageTypes;
    getValues: UseFormGetValues<ICampaignFormInput>;
    register: UseFormRegister<ICampaignFormInput>;
    errors: FieldErrors<ICampaignFormInput>;
    index: number;
    watch: UseFormWatch<ICampaignFormInput>;
}

const CampaignContentPreview: FC<CampaignContentPreviewProps> = ({
    content,
    getValues,
    register,
    index,
    errors,
    watch,
}) => {
    console.log(getValues().messages[index].options);
    const backgroundColor = watch(`messages.${index}.options.backgroundColor`);
    const font = watch(`messages.${index}.options.font`);
    const text = watch(`messages.${index}.message.text`);
    return (
        <div className="flex flex-col gap-3">
            {"text" in content.message ? (
                <div className="flex flex-col gap-3">
                    <div className="">
                        <input
                            {...register(`messages.${index}.type`)}
                            defaultValue={"text"}
                            type="text"
                            hidden
                        />
                        <input
                            {...register(
                                `messages.${index}.options.backgroundColor`
                            )}
                            defaultValue={content.options?.backgroundColor}
                            type="color"
                            placeholder="background"
                            hidden
                        />
                        <label
                            htmlFor={`text-input-${content.id}`}
                            className="text-white w-52 h-72 rounded-lg flex items-center justify-center p-4 outline-none select-none"
                            style={{
                                backgroundColor: backgroundColor,
                                fontFamily: FontCodeToFont(font!),
                            }}
                        >
                            {text?.length ? text : "Type a message..."}
                        </label>
                    </div>
                    <textarea
                        {...register(`messages.${index}.message.text`)}
                        id={`text-input-${content.id}`}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none w-full"
                        placeholder="Type a message..."
                        rows={3}
                    />
                    <p className="text-xs text-red-500">
                        {typeof errors.messages?.[index]?.message ===
                            "object" && "text" in errors.messages[index].message
                            ? (
                                  errors.messages[index].message.text as {
                                      message: string;
                                  }
                              )?.message
                            : null}
                    </p>
                </div>
            ) : "image" in content.message ? (
                <div className="flex flex-col gap-3">
                    <input
                        {...register(`messages.${index}.type`)}
                        defaultValue={"image"}
                        type="image"
                        hidden
                    />
                    <label
                        htmlFor={`image-input-${content.id}`}
                        className="w-52 h-72 rounded-lg bg-black flex items-center justify-center p-4 outline-none select-none"
                    >
                        <img
                            src={URL.createObjectURL(content.message.image.url)}
                            alt={content.id}
                            className="w-full h-full object-contain"
                        />
                    </label>
                    <textarea
                        {...register(`messages.${index}.message.caption`)}
                        id={`image-input-${content.id}`}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
                        placeholder="Write caption"
                        rows={3}
                    />
                    <p className="text-xs text-red-500">
                        {typeof errors.messages?.[index]?.message ===
                            "object" &&
                        "image" in errors.messages[index].message
                            ? (
                                  errors.messages[index].message.image as {
                                      message: string;
                                  }
                              )?.message
                            : null}
                    </p>
                </div>
            ) : "video" in content.message ? (
                <div className="flex flex-col gap-3">
                    <input
                        {...register(`messages.${index}.type`)}
                        defaultValue={"video"}
                        type="video"
                        hidden
                    />
                    <label
                        htmlFor={`video-input-${content.id}`}
                        className="w-52 h-72 rounded-lg bg-black flex items-center justify-center p-4 outline-none select-none"
                    >
                        <video
                            controls
                            controlsList="nofullscreen"
                            playsInline
                            className="w-52 h-full"
                        >
                            <source
                                src={URL.createObjectURL(
                                    content.message.video.url
                                )}
                            />
                        </video>
                    </label>
                    <textarea
                        {...register(`messages.${index}.message.caption`)}
                        id={`video-input-${content.id}`}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
                        placeholder="Write caption"
                        rows={3}
                    />
                    <p className="text-xs text-red-500">
                        {typeof errors.messages?.[index]?.message ===
                            "object" &&
                        "video" in errors.messages[index].message
                            ? (
                                  errors.messages[index].message.video as {
                                      message: string;
                                  }
                              )?.message
                            : null}
                    </p>
                </div>
            ) : "audio" in content.message ? (
                <div className="flex flex-col gap-3">
                    <label
                        className="w-52 h-72 rounded-lg flex items-center justify-center text-white p-4 outline-none select-none"
                        style={{
                            backgroundColor: content.options?.backgroundColor,
                        }}
                    >
                        <input
                            {...register(`messages.${index}.type`)}
                            defaultValue={"audio"}
                            type="audio"
                            hidden
                        />
                        <audio controls controlsList="nofullscreen" playsInline>
                            <source
                                src={URL.createObjectURL(
                                    content.message.audio.url
                                )}
                                type="audio/mpeg"
                            />
                        </audio>
                    </label>
                </div>
            ) : null}
        </div>
    );
};

export default CampaignContentPreview;
