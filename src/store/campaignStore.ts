import { create } from "zustand";
import { ICreateCampaignContent } from "../interfaces/campaign.interface";

interface CreateCampaignContent {
    contents: ICreateCampaignContent[];
    addContent: (newContent: ICreateCampaignContent) => void;
    removeContent: (id: string) => void;
}

export const useCreateCampaignContent = create<CreateCampaignContent>()(
    (set) => ({
        contents: [],
        addContent: (newContent: ICreateCampaignContent) =>
            set((state) => ({ contents: [newContent, ...state.contents] })),
        removeContent: (id: string) =>
            set((state) => ({
                contents: state.contents.filter((content) => content.id !== id ),
            })),
    })
);
