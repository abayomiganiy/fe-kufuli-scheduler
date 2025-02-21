// import { create } from "zustand";
// import { ICreateCampaignContent } from "../interfaces/campaign.interface";

// interface CreateCampaignContent {
//     messages: ICreateCampaignContent[];
//     addContent: (newContent: ICreateCampaignContent) => void;
//     updateContent: (content: ICreateCampaignContent) => void;
//     removeContent: (id: string) => void;
// }

// export const useCreateCampaignContent = create<CreateCampaignContent>()(
//     (set) => ({
//         messages: [],
//         addContent: (newContent: ICreateCampaignContent) => {
//             set((state) => ({ messages: [...state.messages, newContent] }));
//         },
//         updateContent: (content: ICreateCampaignContent) => {
//             set(({ messages }) => {
//                 const updatedMessmessages = messages.map((c) =>
//                     c.id === content.id ? { ...c, ...content } : c
//                 );
//                 return { messages: updatedMessmessages };
//             });
//         },
//         removeContent: (id: string) => {
//             set(({ messages }) => ({
//                 messages: messages.filter((c) => c.id !== id),
//             }));
//         },
//     })
// );
