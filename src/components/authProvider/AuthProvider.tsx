import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import React, { ReactElement, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { client, request } from "../../utils/axios-utils";

const AuthProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
    const { login, logout, token } = useAuthStore((state) => state);
    useEffect(() => {
        // Refresh the access token when the user reloads the page
        const fetchMe = async () => {
            try {
                const response: {
                    accessToken: string;
                    message: string;
                    ok: boolean;
                } = await request({
                    url: "/auth/me",
                    method: "GET",
                });
                if (response.ok && response.accessToken) {
                    const accessToken: string = response.accessToken;
                    console.log(`response from server fetchMe: ${accessToken}`);
                    login(accessToken);
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                logout();
            }
        };
        fetchMe();
    }, [login, logout]);

    useEffect(() => {
        const authInterceptor = client.interceptors.request.use(
            (config: InternalAxiosRequestConfig & { _retry?: boolean }) => {
                if (!config._retry && token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            client.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useEffect(() => {
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
                            login(refreshTokenResponse.accessToken);
                            originalRequest.headers!.Authorization = `Bearer ${refreshTokenResponse.accessToken}`;
                            originalRequest._retry = true;
                            return await client(originalRequest);
                        } else {
                            console.error(
                                "Error refreshing token:",
                                refreshTokenResponse.message
                            );
                            location.href = "/login";
                            logout();
                            return Promise.reject(error);
                        }
                    } catch (error) {
                        console.error("Error refreshing token:", error);
                        location.href = "/login";
                        logout();
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            client.interceptors.response.eject(refreshTokenInterceptor);
        };
    }, [login, logout]);

    return <>{children}</>;
};

export default AuthProvider;
