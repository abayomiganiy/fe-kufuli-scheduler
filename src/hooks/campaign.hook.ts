import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "../services/campaign.service";

export const useGetCampaigns = () => {
    return useQuery({
        queryKey: ["campaigns"],
        queryFn: getCampaigns,
    });
};
