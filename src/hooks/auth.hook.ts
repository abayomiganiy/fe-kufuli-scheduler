import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    console.log("AuthContext value:", context);
    return context;
};
export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            const resp = await request({
                url: "/auth/login",
                method: "POST",
                data: {
                    email,
                    password,
                },
            });
            return resp;
        },
        onSuccess: (data: {
            ok: boolean;
            message: string;
            accessToken: string;
        }) => {
            console.log("Logged in successfully", data);
            toast.success("Logged in successfully");
            navigate("/");
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};

export const useLogout = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            const resp = await request({
                url: "/auth/logout",
                method: "DELETE",
                withCredentials: true,
            });
            console.log(resp.data);
            return resp;
        },
        onSuccess: (data: {
            ok: boolean;
            message: string;
            accessToken: string;
        }) => {
            console.log("Logged out successfully", data);
            toast.success("Logged out successfully");
            navigate("/login");
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};
