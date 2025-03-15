export type CampaignStatus = "active" | "pending" | "inactive";
export type MessageType = "group" | "number";
export type CampaignContentType = "text" | "image" | "video" | "audio";
// | "document";
export type Frequency =
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "YEARLY"
    | "ONCE"
    | "CUSTOM";

export enum FrequencyEnum {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    ONCE = "ONCE",
    CUSTOM = "CUSTOM",
}

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
    messages: MessageTypes[];
    status: CampaignStatus;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    recipients: string[];
    userId: string;
    socialAccountId: string;
    frequency: Frequency;
    isActive: true;
    isEighteenPlus: false;
    lastUploadedAt: Date;
    scheduledTime: Date;
    uploadCount: number;
}

export interface MessageTypes {
    id?: string;
    type: CampaignContentType;
    content:
        | { text: string }
        | { image: { url: File | string }; caption: string }
        | { video: { url: File | string }; caption: string }
        | { audio: { url: File | string } };
    options?: {
        font?: number;
        backgroundColor?: string;
    };
}

export interface ICampaignFormInput {
    socialAccountId: string;
    name: string;
    isEighteenPlus: boolean;
    frequency: Frequency;
    scheduledTime: Date;
    messages: MessageTypes[];
    recipients: string[];
}
