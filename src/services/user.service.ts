import { request } from "../utils/axios-utils";

export const getUser = async () => {
    const resp = await request({
        url: "/users",
        method: "GET",
    });
    return resp;
};
