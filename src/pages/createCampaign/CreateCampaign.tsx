import React from "react";
import { v4 as uuidv4 } from "uuid";
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

const CreateCampaign: React.FC = () => {
    const { contents, addContent } = useCreateCampaignContent((state) => state);
    const contentTemplates: Record<
        CampaignContentType,
        Partial<ICreateCampaignContent>
    > = {
        text: { text: "Type a story", mimetype: "text" },
        image: { caption: "", image: "", mimetype: "image" },
        video: { caption: "", video: "", mimetype: "video" },
        audio: { audio: "", mimetype: "audio" },
    };

    const handleAddContent = (type: CampaignContentType) => {
        const template = contentTemplates[type];
        if (template) {
            addContent({
                id: uuidv4(),
                ...template,
            } as ICreateCampaignContent);
        } else {
            console.error(`Unsupported content type: ${type}`);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-3">
                <BackIcon />
                <SectionHeader title="CreateCampaign" />
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex overflow-auto pb-5">
                    <div className="flex justify-center gap-4 flex-nowrap">
                        {contents.map((content) => (
                            <CampaignContentPreview
                                content={content}
                                key={content.id}
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
                        <ContentTypeIcon
                            key={index}
                            onClick={() => handleAddContent(type)}
                            type={type}
                        />
                    ))}
                </div>
                <div>
                    <RadioGroup
                        name="is_eighteen_plus"
                        title="Is this rated 18+"
                        options={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" },
                        ]}
                    />
                </div>
                <div>
                    <RadioGroup
                        name="frequency"
                        title="Frequency"
                        options={[
                            { label: "Once", value: "once" },
                            { label: "Daily", value: "daily" },
                            { label: "Weekly", value: "weekly" },
                            { label: "Custom", value: "custom" },
                        ]}
                    />
                </div>
                <div>
                    <RadioGroup
                        name="schedule"
                        title="Schedule"
                        options={[
                            { label: "Post now", value: "post_now" },
                            { label: "Select Date", value: "select_ate" },
                        ]}
                    />
                </div>
                <Button>Continue</Button>
            </div>
        </div>
    );
};

export default CreateCampaign;
