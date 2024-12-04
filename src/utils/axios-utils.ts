import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { verifyToken } from "./verifyToken";

export const client: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const request = async ({ ...options }) => {
    if (options?.headers) {
        const token = options?.headers?.Authorization?.split(" ")[1];
        console.log(token);

        // Verify token before making the request. If not verified, remove the token from headers.
        const verified = token ? verifyToken(token) : false;

        if (!verified) {
            options.headers.Authorization = null;
        } else {
            options.headers.Authorization = `Bearer ${token}`;
        }
    }

    client.defaults.headers.common["Content-Type"] = "application/json";

    const onSuccess = (response: AxiosResponse) => {
        return response.data;
    };

    const onError = (error: AxiosError) => {
        console.error(
            "Server error:",
            error.response?.status,
            error.response?.data
        );
        throw error.response;
    };

    try {
        const response = await client(options);
        return onSuccess(response);
    } catch (error) {
        return onError(error as AxiosError);
    }
};
