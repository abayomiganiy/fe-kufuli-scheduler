import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import React, {
    ReactElement,
    useLayoutEffect,
} from "react";
import { client, request } from "../../utils/axios-utils";
import { useAuthStore } from "../../store/authStore";

const AuthProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
    const { login, logout, token } = useAuthStore((state) => state);
    console.log(`token: ${token}`);
    useLayoutEffect(() => {
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
                    const accessToken: string = response.accessToken!;
                    console.log(`response from server fetchMe: ${accessToken}`);
                    if (accessToken) {
                        login(accessToken);
                    } else {
                        logout();
                    }
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                logout();
            }
        };
        fetchMe();
    }, [login, logout]);

    useLayoutEffect(() => {
        const authInterceptor = client.interceptors.request.use(
            (config: InternalAxiosRequestConfig & { _retry?: boolean }) => {
                if (!config._retry && token !== null) {
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
                    !originalRequest._retry && token === null
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
                        }
                    } catch (error) {
                        console.error("Error refreshing token:", error);
                        logout();
                        window.location.href = "/login";
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            client.interceptors.response.eject(refreshTokenInterceptor);
        };
    }, [login, logout, token]);

    return <>{children}</>;
};

export default AuthProvider;
