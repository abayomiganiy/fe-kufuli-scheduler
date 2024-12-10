import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

export const useGetContacts = () => {
    return useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const resp = await request({
                url: "/contacts/LakersAccountKufuli",
                method: "GET",
            });
            return resp;
        },
    });
};
