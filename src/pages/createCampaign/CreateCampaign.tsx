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
    ICreateCampaignContent,
} from "../../interfaces/campaign.interface";
import { useCreateCampaignContent } from "../../store/campaignStore";
import { CampaingActions } from "../../components/campaignContentPreview/CampaignContentPreview";

interface IFormInput {
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
    const { contents } = useCreateCampaignContent((state) => state);

    const {
        handleSubmit,
        control,
        formState: { errors },
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
                                <div className="relative" key={content.id}>
                                    <Controller
                                        
                                        name={`contents.${index}.backgroundColor`}
                                        control={control}
                                        render={({ field }) => (
                                            <CampaingActions
                                                content={content}
                                                field={field}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name={`contents.${index}.text`}
                                        control={control}
                                        render={({ field }) => (
                                            <CampaignContentPreview
                                                field={field}
                                                content={content}
                                            />
                                        )}
                                    />
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
                                            value: "select_ate",
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
