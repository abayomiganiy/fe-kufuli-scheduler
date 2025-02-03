import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Button from "../../components/button";
import CampaignContentPreview from "../../components/campaignContentPreview";
import ContentTypeIcon from "../../components/contentTypeIcon";
import BackIcon from "../../components/icons/backIcon";
import RadioGroup from "../../components/radioGroup/RadioGroup";
import SectionHeader from "../../components/sectionHeader";
import {
    CampaignContentType,
    CreateTextStory,
    ICreateCampaignContent,
} from "../../interfaces/campaign.interface";
import { useCreateCampaignContent } from "../../store/campaignStore";
import CampaignPreviewActions from "../../components/campaignPreviewActions";

export interface IFormInput {
    is_eighteen_plus: string;
    frequency: string;
    schedule: string;
    contents: ICreateCampaignContent[];
}

const createCampaignSchema = z
    .object({
        contents: z.array(
            z.object({
                text: z.string().min(1, "Content cannot be empty."),
                backgroundColor: z.string(),
            })
        ),
        is_eighteen_plus: z
            .enum(["yes", "no"])
            .refine((val) => val !== undefined, {
                message: "Please select an option.",
            }),
        frequency: z
            .enum(["once", "daily", "weekly", "custom"])
            .refine((val) => val !== undefined, {
                message: "Please select a frequency.",
            }),
        schedule: z
            .enum(["post_now", "select_date"])
            .refine((val) => val !== undefined, {
                message: "Please select a schedule.",
            }),
    })
    .required();

const CreateCampaign: React.FC = () => {
    const { contents, updateContent } = useCreateCampaignContent(
        (state) => state
    );

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm<IFormInput>({
        resolver: zodResolver(createCampaignSchema),
    });

    const onSubmit = (data: IFormInput) => {
        console.log(data);
    };
    console.log(`errors: ${JSON.stringify(errors)}`);

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
                    <div className="flex overflow-auto pb-5">
                        <div className="flex justify-center gap-4 flex-nowrap">
                            {contents.map((content, index) => (
                                <div className="flex flex-col gap-3 relative">
                                    <CampaignPreviewActions
                                        content={content}
                                        setValue={setValue}
                                        index={index}
                                    />
                                    <CampaignContentPreview
                                        key={index}
                                        content={content}
                                        getValues={getValues}
                                    />
                                    <div key={content.id}>
                                        <input
                                            {...register(
                                                `contents.${index}.backgroundColor`
                                            )}
                                            defaultValue={
                                                (content as CreateTextStory)
                                                    .backgroundColor
                                            }
                                            type="color"
                                            placeholder="background"
                                            hidden
                                        />
                                        <textarea
                                            {...register(
                                                `contents.${index}.text`
                                            )}
                                            onChange={(e) => {
                                                updateContent({
                                                    ...(content as CreateTextStory),
                                                    id: content.id,
                                                    text: e.target.value,
                                                });
                                            }}
                                            id={`text-input-${content.id}`}
                                            className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none w-full"
                                            placeholder="Type a message..."
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            ))}
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
                            <ContentTypeIcon key={index} type={type} />
                        ))}
                    </div>
                    <div>
                        <Controller
                            name="is_eighteen_plus"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    title="Is this rated 18+"
                                    options={[
                                        { label: "Yes", value: "yes" },
                                        { label: "No", value: "no" },
                                    ]}
                                />
                            )}
                        />
                        {errors.is_eighteen_plus && (
                            <p className="text-xs text-red-500">
                                {errors.is_eighteen_plus.message}
                            </p>
                        )}
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
                                        { label: "Once", value: "once" },
                                        { label: "Daily", value: "daily" },
                                        { label: "Weekly", value: "weekly" },
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
                        <Controller
                            name="schedule"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    title="Schedule"
                                    options={[
                                        {
                                            label: "Post now",
                                            value: "post_now",
                                        },
                                        {
                                            label: "Select Date",
                                            value: "select_date",
                                        },
                                    ]}
                                />
                            )}
                        />
                        {errors.schedule && (
                            <p className="text-xs text-red-500">
                                {errors.schedule.message}
                            </p>
                        )}
                    </div>
                    <Button type="submit">Continue</Button>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaign;
