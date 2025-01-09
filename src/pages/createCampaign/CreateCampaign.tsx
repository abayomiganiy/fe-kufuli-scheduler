import React, { useEffect, useState } from "react";
import campaign2 from "../../assets/communication-social-media-icons-smartphone-device.png";
import campaign1 from "../../assets/test-campaign/Rectangle 110.png";
import Button from "../../components/button";
import ContentTypeIcon from "../../components/contentTypeIcon";
import BackIcon from "../../components/icons/backIcon";
import RadioGroup from "../../components/radioGroup/RadioGroup";
import SectionHeader from "../../components/sectionHeader";
import {
    CampaignContentType,
    CreateImageMessage,
    CreateImageStory,
    CreateTextMessage,
    CreateTextStory,
    ICreateCampaignContent,
} from "../../interfaces/campaign.interface";

const CreateCampaign: React.FC = () => {
    const [contents, setContents] = useState<ICreateCampaignContent[]>([]);
    const handleAddContent = (type: CampaignContentType) => {
        switch (type) {
            case "text":
                alert("Add campaign text content");
                break;
            case "image":
                alert("Add campaign image content");
                break;
            case "video":
                alert("Add campaign video content");
                break;
            case "audio":
                alert("Add campaign audio content");
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setContents([
            {
                image: campaign2,
                caption: "Campaign 2",
                views: 23,
                mimetype: "image",
            } as CreateImageMessage | CreateImageStory,
            {
                text: "campaign1 jkf eijneui jierbibiebfi neriuhienhui9nhie rebie8oenor jkd",
                views: 23,
                backgroundColor: "#ff00ff",
                mimetype: "text",
            } as CreateTextMessage | CreateTextStory,
            {
                caption:
                    "campaign1 jkf eijneui jierbibiebfi neriuhienhui9nhie rebie8oenor jkd",
                image: campaign1,
                views: 23,
                mimetype: "image",
            } as CreateImageMessage | CreateImageStory,
        ]);
    }, []);

    return (
        <div>
            <div className="flex items-center gap-3">
                <BackIcon />
                <SectionHeader title="CreateCampaign" />
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex overflow-auto pb-5">
                    <div className="flex justify-center gap-4 flex-nowrap">
                        {contents.map((content, index) => (
                            <ContentPreview key={index} content={content} />
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

const ContentPreview: React.FC<{ content: ICreateCampaignContent }> = ({
    content,
}) => {
    return (
        <>
            {content.mimetype === "image" ? (
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
                    />
                </div>
            ) : content.mimetype === "text" ? (
                <div className="flex flex-col gap-3">
                    <div
                        className="w-52 h-72 rounded-lg flex items-center justify-center text-white p-4"
                        style={{
                            backgroundColor:
                                (content as CreateTextStory).backgroundColor ??
                                "black",
                        }}
                    >
                        {content.text}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default CreateCampaign;
