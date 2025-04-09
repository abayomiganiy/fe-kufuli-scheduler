import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
    createCampaign,
    deleteCampaign,
    getCampaigns,
} from "../services/campaign.service";
import {
    CampaignStatus,
    ICampaign,
    ICampaignFormInput,
} from "../interfaces/campaign.interface";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetCampaigns = (filter?: { status: CampaignStatus }) => {
    return useInfiniteQuery({
        queryKey: ["campaigns", filter],
        queryFn: ({
            pageParam,
        }: {
            pageParam?: number;
        }): Promise<ICampaign[]> => getCampaigns({ filter, pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            // If the last page is empty or smaller than expected page size, we've reached the end
            if (lastPage.length === 0 || lastPage.length < 10) {
                return undefined; // Return undefined to signal end of pagination
            }
            // Return the total count of all items fetched so far
            return allPages.flatMap(page => page).length;
        },
    });
};

export const useCreateCampaign = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["createCampaign"],
        mutationFn: async (data: ICampaignFormInput) => {
            await createCampaign(data);
        },
        onSuccess: () => {
            // Handle success
            console.log("Campaign created successfully!");
            toast.success("Campaign created successfully!");
            navigate("/campaigns");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            // Handle error
            console.error("Error creating campaign:", error);
            toast.error(error?.data?.message || "Error creating campaign");
        },
    });
};

export const useDeleteCampaign = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["deleteCampaign"],
        mutationFn: async (campaignId: string) => {
            await deleteCampaign(campaignId);
        },
        onSuccess: () => {
            // Handle success
            console.log("Campaign deleted successfully!");
            toast.success("Campaign deleted successfully!");
            navigate("/campaigns");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            // Handle error
            console.error("Error deleting campaign:", error);
            toast.error(error?.data?.message || "Error deleting campaign");
        },
    });
};
