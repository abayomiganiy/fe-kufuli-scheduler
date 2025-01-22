import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/button";
import CampaignContentPreview from "../../components/campaignContentPreview";
import ContentTypeIcon from "../../components/contentTypeIcon";
import BackIcon from "../../components/icons/backIcon";
import RadioGroup from "../../components/radioGroup/RadioGroup";
import SectionHeader from "../../components/sectionHeader";
import { CampaignContentType } from "../../interfaces/campaign.interface";
import { useCreateCampaignContent } from "../../store/campaignStore";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormInput {
    is_eighteen_plus: string;
    frequency: string;
    schedule: string;
    contents: CampaignContentType[];
}

const createCampaignSchema = z
    .object({
        contents: z
            .object({
                text: z.string(),
            })
            .array(),
        is_eighteen_plus: z.string(),
        frequency: z.string(),
        schedule: z.string(),
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

    console.log(errors);

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
                            {contents.map((content) => (
                                <Controller
                                    name="contents"
                                    control={control}
                                    key={content.id}
                                    render={({ field }) => (
                                        <CampaignContentPreview
                                            {...field}
                                            content={content}
                                        />
                                    )}
                                />
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
