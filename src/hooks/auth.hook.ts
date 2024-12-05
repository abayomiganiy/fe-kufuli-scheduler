import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { request } from "../utils/axios-utils";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};
export const useSignUp = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async ({
            fullName,
            email,
            password,
        }: {
            fullName: string;
            email: string;
            password: string;
        }) => {
            const resp = await request({
                url: "/auth/sign-up",
                method: "POST",
                data: {
                    fullName,
                    email,
                    password,
                },
            });
            return resp;
        },
        onSuccess: (data: { ok: boolean; message: string; email: string }) => {
            console.log("Signup successfully", data.email);
            toast.success("Signup successfully");
            localStorage.setItem("emailToVerify", data.email);
            navigate(`/verify-account`, {
                state: data,
            });
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};

export const useLogin = () => {
    // const navigate = useNavigate();
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
            // TODO: Make auth work without reloading page
            // navigate("/", { replace: true });
            if (localStorage.getItem("showConnectAccount") === "true") {
                localStorage.removeItem("showConnectAccount");
                window.location.href = "/connect-account";
                return
            }
            window.location.href = "/";
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};

export const useLogout = () => {
    // const navigate = useNavigate();
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
        onSuccess: () => {
            window.location.href = "/login";
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};
