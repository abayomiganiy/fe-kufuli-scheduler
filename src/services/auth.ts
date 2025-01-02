import { request } from "../utils/axios-utils";

export const login = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    const resp = await request({
        url: "/auth/login",
        method: "POST",
        data: {
            username,
            password,
        },
    });
    return resp;
}

export const signup = async ({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}) => {
    const resp = await request({
        url: "/auth/sign-up",
        method: "POST",
        data: {
            username,
            email,
            password,
        },
    });
    return resp;
}

export const logout = async () => {
    const resp = await request({
        url: "/auth/logout",
        method: "DELETE",
        withCredentials: true,
    });
    console.log(resp.data);
    return resp;
}