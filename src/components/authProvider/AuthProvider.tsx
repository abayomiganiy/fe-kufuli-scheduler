import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import React, { ReactElement, useLayoutEffect, useState } from "react";
import { client, request } from "../../utils/axios-utils";
import AuthContext from "../../contexts/AuthContext";

const AuthProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useLayoutEffect(() => {
        const fetchMe = async () => {
            try {
                console.log("Fetching me...");
                const response: {
                    accessToken: string;
                    message: string;
                    ok: boolean;
                } = await request({
                    url: "/auth/me",
                    method: "GET",
                });
                if (response.ok && response.accessToken) {
                    const accessToken: string = response.accessToken!;
                    console.log(`response from server fetchMe: ${accessToken}`);
                    setToken(accessToken);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setToken(null);
            }
        };
        fetchMe();
    }, []);

    useLayoutEffect(() => {
        const authInterceptor = client.interceptors.request.use(
            (config: InternalAxiosRequestConfig & { _retry?: boolean }) => {
                if (!config._retry && token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config; // Ensure this matches the expected return type
            },
            (error) => Promise.reject(error)
        );

        return () => {
            client.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        const refreshTokenInterceptor = client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest: AxiosRequestConfig & {
                    _retry?: boolean;
                } = error.config;
                if (
                    error.response &&
                    error.response.status === 401 &&
                    !originalRequest._retry
                ) {
                    try {
                        const refreshTokenResponse = await request({
                            url: "/auth/refresh-token",
                            method: "POST",
                        });
                        if (refreshTokenResponse.ok) {
                            setToken(refreshTokenResponse.accessToken);
                            originalRequest.headers!.Authorization = `Bearer ${refreshTokenResponse.accessToken}`;
                            originalRequest._retry = true;
                            return await client(originalRequest);
                        }
                    } catch (error) {
                        console.error("Error refreshing token:", error);
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            client.interceptors.response.eject(refreshTokenInterceptor);
        };
    }, [token]);

    return (
        <AuthContext.Provider value={token ?? null}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
