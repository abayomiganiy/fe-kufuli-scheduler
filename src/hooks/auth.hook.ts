import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login, logout, signup } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
    // const context = useContext(AuthContext);
    const authState = useAuthStore((state) => state);
    return authState;
};

export const useSignUp = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["signup"],
        mutationFn: signup,
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
    const authState = useAuth();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: login,
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
            authState.login(data.accessToken);
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
    const authState = useAuth();
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: logout,
        onSuccess: () => {
            navigate("/login");
            authState.logout();
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};
