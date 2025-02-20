import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../services/analytics.service";

export const useGetAnalytics = () => {
    return useQuery({
        queryKey: ["analytics"],
        queryFn: getAnalytics,
    });
};
