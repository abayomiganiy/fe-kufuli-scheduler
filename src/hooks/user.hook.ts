import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const resp = await request({
                url: "/users",
                method: "GET",
            });
            return resp;
        },
    });
};
