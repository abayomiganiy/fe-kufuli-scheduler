import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../services/messages.service";

export const useGetMessages = (data: { campaignId: string }) => {
    return useQuery({
        queryKey: ["messages"],
        queryFn: () => getMessages(data),
    });
};
