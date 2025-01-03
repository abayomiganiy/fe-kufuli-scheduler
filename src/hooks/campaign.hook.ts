import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "../services/campaign.service";
import { CampaignStatus } from "../interfaces/campaign.interface";

export const useGetCampaigns = (filter?: {status: CampaignStatus}) => {
    return useQuery({
        queryKey: ["campaigns", filter],
        queryFn: () => getCampaigns(filter),
    });
};
