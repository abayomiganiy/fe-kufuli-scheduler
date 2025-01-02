import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/user.service";

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });
};
