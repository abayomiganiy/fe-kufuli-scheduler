export type CampaignStatus = "active" | "pending" | "inactive";
export type MessageType = "group" | "number";
export type CampaignContentType = "text" | "image" | "video" | "audio";
// | "document";

export enum FontType {
    CALISTOGA_REGULAR = 8,
    COURIERPRIME_BOLD = 10,
    EXO2_EXTRABOLD = 9,
    FB_SCRIPT = 2,
    MORNINGBREEZE_REGULAR = 7,
    SYSTEM = 0,
    SYSTEM_BOLD = 6,
    SYSTEM_TEXT = 1,
}

export interface ICampaign {
    id: string;
    content: MessageTypes[];
    status: CampaignStatus;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MessageTypes {
    id?: string;
    type: CampaignContentType;
    message:
        | { text: string }
        | { image: { url: string }; caption: string }
        | { video: { url: string }; caption: string }
        | { audio: { url: string } };
    options?: {
        font?: number;
        backgroundColor?: string;
    };
}

export interface ICampaignFormInput {
    name: string;
    isEighteenPlus: boolean;
    frequency: string;
    scheduledTime: Date;
    messages: MessageTypes[];
    recipients: string[];
}
