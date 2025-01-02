import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../services/analytics.hooks";

export const useGetAnalytics = () => {
    return useQuery({
        queryKey: ["analytics"],
        queryFn: getAnalytics,
    });
};
