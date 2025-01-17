import {
    CampaignContentType,
    ICreateCampaignContent,
} from "../../interfaces/campaign.interface";
import { useCreateCampaignContent } from "../../store/campaignStore";
import { v4 as uuidv4 } from "uuid";

const ContentTypeIcon = ({ type }: { type: CampaignContentType }) => {
    const iconPath = {
        text: (
            <path
                d="M30.8475 40.3839V26.7361H26.1045V24.1088H38.8455V26.7361H34.0793V40.3839H30.8475Z"
                fill="#202020"
            />
        ),
        image: (
            <>
                <path
                    d="M26.5938 28.4464C27.6811 28.4464 28.5625 27.5649 28.5625 26.4776C28.5625 25.3903 27.6811 24.5089 26.5938 24.5089C25.5064 24.5089 24.625 25.3903 24.625 26.4776C24.625 27.5649 25.5064 28.4464 26.5938 28.4464Z"
                    stroke="#141B34"
                    stroke-width="1.96875"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M20.0312 32.3839C20.0312 26.506 20.0312 23.5671 21.8573 21.7411C23.6833 19.9151 26.6222 19.9151 32.5 19.9151C38.3778 19.9151 41.3167 19.9151 43.1428 21.7411C44.9688 23.5671 44.9688 26.506 44.9688 32.3839C44.9688 38.2616 44.9688 41.2006 43.1428 43.0267C41.3167 44.8526 38.3778 44.8526 32.5 44.8526C26.6222 44.8526 23.6833 44.8526 21.8573 43.0267C20.0312 41.2006 20.0312 38.2616 20.0312 32.3839Z"
                    stroke="#141B34"
                    stroke-width="1.96875"
                />
                <path
                    d="M23.3125 44.1963C29.0514 37.3385 35.4848 28.2942 44.9655 34.4082"
                    stroke="#141B34"
                    stroke-width="1.96875"
                />
            </>
        ),
        video: (
            <>
                <path
                    d="M19.375 31.0714C19.375 26.7403 19.375 24.5748 20.7205 23.2293C22.066 21.8838 24.2315 21.8839 28.5625 21.8839H29.875C34.206 21.8839 36.3715 21.8838 37.7171 23.2293C39.0625 24.5748 39.0625 26.7403 39.0625 31.0714V33.6964C39.0625 38.0273 39.0625 40.1928 37.7171 41.5384C36.3715 42.8838 34.206 42.8839 29.875 42.8839H28.5625C24.2315 42.8839 22.066 42.8838 20.7205 41.5384C19.375 40.1928 19.375 38.0273 19.375 33.6964V31.0714Z"
                    stroke="#141B34"
                    stroke-width="1.96875"
                />
                <path
                    d="M39.0625 28.3228L39.2277 28.1864C42.0047 25.8952 43.3932 24.7495 44.5091 25.3027C45.625 25.8558 45.625 27.6898 45.625 31.3576V33.4101C45.625 37.078 45.625 38.9118 44.5091 39.4651C43.3932 40.0181 42.0047 38.8726 39.2277 36.5812L39.0625 36.4449"
                    stroke="#141B34"
                    stroke-width="1.96875"
                    stroke-linecap="round"
                />
                <path
                    d="M31.8438 31.0714C32.9311 31.0714 33.8125 30.1899 33.8125 29.1026C33.8125 28.0153 32.9311 27.1339 31.8438 27.1339C30.7564 27.1339 29.875 28.0153 29.875 29.1026C29.875 30.1899 30.7564 31.0714 31.8438 31.0714Z"
                    stroke="#141B34"
                    stroke-width="1.96875"
                />
            </>
        ),
        audio: (
            <>
                <path
                    d="M39.0625 25.8214V31.0714C39.0625 34.6957 36.1243 37.6339 32.5 37.6339C28.8756 37.6339 25.9375 34.6957 25.9375 31.0714V25.8214C25.9375 22.197 28.8756 19.2589 32.5 19.2589C36.1243 19.2589 39.0625 22.197 39.0625 25.8214Z"
                    stroke="#141B34"
                    stroke-width="1.96875"
                />
                <path
                    d="M43 31.0714C43 36.8704 38.299 41.5714 32.5 41.5714M32.5 41.5714C26.701 41.5714 22 36.8704 22 31.0714M32.5 41.5714V45.5089M32.5 45.5089H36.4375M32.5 45.5089H28.5625"
                    stroke="#141B34"
                    stroke-width="1.96875"
                    stroke-linecap="round"
                />
            </>
        ),
    };

    const { addContent } = useCreateCampaignContent((state) => state);

    const handleAddContent = (type: CampaignContentType, file?: File) => {
        const contentTemplates: Record<
            CampaignContentType,
            Partial<ICreateCampaignContent>
        > = {
            text: { text: "", mimetype: "text" },
            image: {
                caption: "",
                image: file && URL.createObjectURL(file),
                mimetype: "image",
            },
            video: {
                caption: "",
                video: file && URL.createObjectURL(file),
                mimetype: "video",
            },
            audio: {
                audio: file && URL.createObjectURL(file),
                mimetype: "audio",
            },
        };
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
            <input
                type="file"
                accept={`${type}/*`}
                multiple={false}
                id={`${type}-input`}
                hidden
                onChange={(e) => {
                    const file = e.target.files![0];
                    if (file) {
                        handleAddContent(type, file);
                    }
                }}
            />
            <label htmlFor={type === "text" ? "" : `${type}-input`}>
                <svg
                    width="65"
                    height="65"
                    viewBox="0 0 65 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => type === "text" && handleAddContent(type)}
                    className="cursor-pointer"
                >
                    <rect
                        x="0.820255"
                        y="0.704106"
                        width="63.3595"
                        height="63.3595"
                        rx="11.6797"
                        fill="#F2F2F2"
                    />
                    <rect
                        x="0.820255"
                        y="0.704106"
                        width="63.3595"
                        height="63.3595"
                        rx="11.6797"
                        stroke="#E0E0E0"
                        stroke-width="0.640511"
                    />
                    {iconPath[type]}
                    <rect
                        x="44"
                        y="43.5"
                        width="16"
                        height="16"
                        rx="8"
                        fill="#FF3B30"
                    />
                    <path
                        d="M52.2896 55.4864C51.7214 55.4864 51.2608 55.0258 51.2608 54.4576V48.5288C51.2608 47.9606 51.7214 47.5 52.2896 47.5C52.8578 47.5 53.3184 47.9606 53.3184 48.5288V54.4576C53.3184 55.0258 52.8578 55.4864 52.2896 55.4864ZM49.0201 52.5046C48.4567 52.5046 48 52.0479 48 51.4845C48 50.9211 48.4567 50.4644 49.0201 50.4644H55.5417C56.1051 50.4644 56.5618 50.9211 56.5618 51.4845C56.5618 52.0479 56.1051 52.5046 55.5417 52.5046H49.0201Z"
                        fill="white"
                    />
                </svg>
            </label>
        </div>
    );
};

export default ContentTypeIcon;
