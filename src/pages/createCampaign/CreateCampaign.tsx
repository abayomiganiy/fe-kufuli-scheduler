import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import Button from "../../components/button";
import CampaignContentPreview from "../../components/campaignContentPreview";
import CampaignPreviewActions from "../../components/campaignPreviewActions";
import ContentTypeIcon from "../../components/contentTypeIcon";
import BackIcon from "../../components/icons/backIcon";
import RadioGroup from "../../components/radioGroup/RadioGroup";
import SectionHeader from "../../components/sectionHeader";
import { useCreateCampaign } from "../../hooks/campaign.hook";
import { useGetContacts } from "../../hooks/contact.hook";
import {
    CampaignContentType,
    MessageTypes,
} from "../../interfaces/campaign.interface";
import { useCurrentSocialAccount } from "../../store/currentSocialAccountStore";

export interface ICampaignFormInput {
    name: string;
    isEighteenPlus: boolean;
    frequency: string;
    scheduledTime: Date;
    messages: MessageTypes[];
    recipients: string[];
}

const textMessageSchema = z.object({
    type: z.literal("text"),
    message: z.object({
        text: z.string().min(1, "Text cannot be empty"),
    }),
    options: z.object({
        font: z.number().optional(),
        backgroundColor: z.string().optional(),
    }),
});

const imageMessageSchema = z.object({
    type: z.literal("image"),
    message: z.object({
        image: z.object({
            url: z.string(),
        }),
        caption: z.string().optional(),
    }),
});

const videoMessageSchema = z.object({
    type: z.literal("video"),
    message: z.object({
        video: z.object({
            url: z.string(),
        }),
        caption: z.string().optional(),
    }),
});

const audeoMessageSchema = z.object({
    type: z.literal("audio"),
    message: z.object({
        audio: z.object({
            url: z.string(),
        }),
    }),
    options: z.object({
        backgroundColor: z.string().optional(),
    }),
});

const messagesSchema = z.array(
    z.discriminatedUnion("type", [
        textMessageSchema,
        imageMessageSchema,
        videoMessageSchema,
        audeoMessageSchema,
    ])
);

const createCampaignSchema = z
    .object({
        // name: z.string().min(5, ""),
        messages: messagesSchema,
        // z.array(
        //     z.object({
        //         message: z.object({
        //             text: z.string().optional(),
        //             image: z
        //                 .object({
        //                     url: z.string().optional(),
        //                     caption: z.string().optional(),
        //                 })
        //                 .optional(),
        //             video: z
        //                 .object({
        //                     url: z.string().optional(),
        //                     caption: z.string().optional(),
        //                 })
        //                 .optional(),
        //         }).required(),
        //         options: z
        //             .object({
        //                 font: z.number().optional(),
        //                 backgroundColor: z.string().optional(),
        //             })
        //             .optional(),
        //     }).required()
        // ),
        isEighteenPlus: z.boolean().refine((val) => val !== undefined, {
            message: "Please select an option.",
        }),
        frequency: z
            .enum(["ONCE", "DAILY", "WEEKLY", "MONTHLY", "YEARLY", "CUSTOM"])
            .refine((val) => val !== undefined, {
                message: "Please select a frequency.",
            }),
        scheduledTime: z.string().pipe(z.coerce.date()),
        recipients: z.array(z.string()),
    })
    .required();

const CreateCampaign: React.FC = () => {
    const { currentAccount } = useCurrentSocialAccount();
    const { mutate: createCampaign } = useCreateCampaign();
    const { data: contacts } = useGetContacts();
    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm<ICampaignFormInput>({
        resolver: zodResolver(createCampaignSchema),
    });

    const {
        fields: messages,
        append: appendMessage,
        remove: removeMessage,
    } = useFieldArray({
        name: "messages",
        control,
    });

    console.log(errors);
    console.log(`getValues: ${JSON.stringify(getValues())}`);
    // console.log(`messages: ${JSON.stringify(messages)}`);

    const onSubmit = (data: ICampaignFormInput) => {
        const hardCodedData = {
            ...data,
            name: `My Business Campaign ${Date.now()}`,
            socialAccountId: currentAccount!.id,
        };

        console.log(`hardCodedData: ${JSON.stringify(data)}`);

        createCampaign(hardCodedData);
    };

    return (
        <div>
            <div className="flex items-center gap-3">
                <BackIcon />
                <SectionHeader title="Create Campaign" />
            </div>
            <div className="flex flex-col gap-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 pb-5"
                >
                    <div className="flex overflow-x-auto pb-5">
                        <div className="flex justify-center gap-4 flex-nowrap">
                            {messages.map((message, index) => {
                                return (
                                    <div
                                        className="flex flex-col gap-3 relative"
                                        key={message.id}
                                    >
                                        <CampaignPreviewActions
                                            content={message}
                                            setValue={setValue}
                                            index={index}
                                            removeMessage={removeMessage}
                                        />
                                        <CampaignContentPreview
                                            content={message}
                                            getValues={getValues}
                                            register={register}
                                            index={index}
                                            errors={errors}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex justify-center gap-5">
                        {(
                            [
                                "text",
                                "image",
                                "video",
                                "audio",
                            ] as CampaignContentType[]
                        ).map((type, index) => (
                            <div key={index}>
                                <ContentTypeIcon
                                    key={index}
                                    type={type}
                                    appendMessage={appendMessage}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex items-center gap-4 p-2">
                            <input
                                type="checkbox"
                                {...register("isEighteenPlus")}
                                className="ml-2"
                                id="isEighteenPlus"
                            />
                            <label
                                htmlFor={`isEighteenPlus`}
                                className="cursor-pointer"
                            >
                                Is this rated 18+
                            </label>

                            {errors.isEighteenPlus && (
                                <p className="text-xs text-red-500">
                                    {errors.isEighteenPlus.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Controller
                            name="frequency"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    title="Frequency"
                                    options={[
                                        { label: "Once", value: "ONCE" },
                                        { label: "Daily", value: "DAILY" },
                                        { label: "Weekly", value: "WEEKLY" },
                                        { label: "Monthly", value: "MONTHLY" },
                                        { label: "Yearly", value: "YEARLY" },
                                        { label: "Custom", value: "custom" },
                                    ]}
                                />
                            )}
                        />
                        {errors.frequency && (
                            <p className="text-xs text-red-500">
                                {errors.frequency.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="flex flex-col gap-4 p-2">
                            <label
                                htmlFor={`scheduledTime`}
                                className="cursor-pointer"
                            >
                                Schedule
                            </label>
                            <input
                                type="datetime-local"
                                {...register("scheduledTime")}
                                className="ml-2"
                                id="scheduledTime"
                            />
                            {errors.scheduledTime && (
                                <p className="text-xs text-red-500">
                                    {errors.scheduledTime.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col gap-4 p-2">
                            <label className="cursor-pointer">Recipients</label>
                            <div className="flex flex-col gap-2 ml-2">
                                {contacts?.map((recipient) => (
                                    <label
                                        key={recipient}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            value={recipient}
                                            {...register("recipients")}
                                            className="cursor-pointer h-5 w-5 rounded-full"
                                        />
                                        +{recipient.split("@")[0]}
                                    </label>
                                ))}
                            </div>
                            {errors.recipients && (
                                <p className="text-xs text-red-500">
                                    {errors.recipients.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <Button type="submit">Continue</Button>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaign;
