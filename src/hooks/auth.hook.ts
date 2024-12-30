import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { request } from "../utils/axios-utils";

export const useAuth = () => {
    // const context = useContext(AuthContext);
    const authState = useAuthStore((state) => state);
    console.log(authState);
    return authState;
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
    const navigate = useNavigate();
    const { login } = useAuth();
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
            if (localStorage.getItem("showConnectAccount") === "true") {
                localStorage.removeItem("showConnectAccount");
                window.location.href = "/connect-account";
                return;
            }
            toast.success("Logged in successfully");
            login(data.accessToken);
            navigate("/", { replace: true });
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};

export const useLogout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
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
            navigate("/login");
            logout();
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};
