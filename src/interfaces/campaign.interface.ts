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

export type CreateTextMessage = {
    contactList: string[];
    type: MessageType;
    mimetype: "text";
    views: number;
    text: string;
};

export type CreateImageMessage = {
    contactList: string[];
    type: MessageType;
    mimetype: "image";
    views: number;
    image: string;
    caption?: string;
};

export type CreateVideoMessage = {
    contactList: string[];
    type: MessageType;
    mimetype: "video";
    views: number;
    video: string;
    thumbnail: string;
    caption?: string;
    gifPlayback?: boolean;
    ptv?: boolean;
};

export type CreateAudioMessage = {
    contactList: string[];
    type: MessageType;
    mimetype: "audio";
    views: number;
    audio: string;
    ptt?: boolean;
};

export type CreateDocumentMessage = {
    contactList: string[];
    type: MessageType;
    mimetype: "document";
    views: number;
    document: string;
};

export type CreateTextStory = {
    text: string;
    mimetype: "text";
    views: number;
    contactList: string[];
    font: FontType;
    backgroundColor: string;
};

export type CreateImageStory = {
    mimetype: "image";
    views: number;
    image: string;
    caption?: string;
    contactList: string[];
};

export type CreateVideoStory = {
    mimetype: "video";
    views: number;
    video: string;
    thumbnail: string;
    caption?: string;
    contactList: string[];
};

export type CreateAudioStory = {
    mimetype: "audio";
    views: number;
    audio: string;
    contactList: string[];
    backgroundColor?: string;
};

export interface ICreateCampaign {
    content: ICreateCampaignContent[];
    status: CampaignStatus;
    date: Date;
    clicks: string;
}

export type ICreateCampaignContent =
    | { id: `${string}-${string}-${string}-${string}-${string}` } & (
          | CreateTextMessage
          | CreateImageMessage
          | CreateVideoMessage
          | CreateAudioMessage
          | CreateDocumentMessage
          | CreateTextStory
          | CreateImageStory
          | CreateVideoStory
          | CreateAudioStory
      );

export interface ICampaign {
    id: string;
    content: ICreateCampaignContent[];
    status: CampaignStatus;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
