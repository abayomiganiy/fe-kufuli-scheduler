import { create } from "zustand";
import { ICreateCampaignContent } from "../interfaces/campaign.interface";

interface CreateCampaignContent {
    contents: ICreateCampaignContent[];
    addContent: (newContent: ICreateCampaignContent) => void;
    updateContent: (content: ICreateCampaignContent) => void;
    removeContent: (id: string) => void;
}

export const useCreateCampaignContent = create<CreateCampaignContent>()(
    (set) => ({
        contents: [],
        addContent: (newContent: ICreateCampaignContent) => {
            set((state) => ({ contents: [...state.contents, newContent] }));
        },
        updateContent: (content: ICreateCampaignContent) => {
            set(({ contents }) => {
                const updatedContents = contents.map((c) =>
                    c.id === content.id ? { ...c, ...content } : c
                );
                return { contents: updatedContents };
            });
        },
        removeContent: (id: string) => {
            set(({ contents }) => ({
                contents: contents.filter((c) => c.id !== id),
            }));
        },
    })
);
