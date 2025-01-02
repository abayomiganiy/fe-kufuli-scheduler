import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resendVerifyEmail, verifyEmail } from "../services/email.service";

export const useVerifyEmail = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["verify-email"],
        mutationFn: verifyEmail,
        onSuccess: (data: {
            ok: boolean;
            message: string;
            accessToken: string;
        }) => {
            console.log("Account verified successfully", data);
            toast.success("Account verified successfully");
            localStorage.removeItem("emailToVerify");
            localStorage.setItem("showConnectAccount", "true");
            navigate("/login");
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};

export const useResendVerifyEmail = () => {
    return useMutation({
        mutationKey: ["resend-verify-email"],
        mutationFn: resendVerifyEmail,
        onSuccess: (data: { ok: boolean; message: string }) => {
            console.log("Email sent successfully", data);
            toast.success("Email sent successfully");
        },
        onError: (error: { data: { message: string } }) => {
            console.error(error);
            toast.error(error!.data!.message);
        },
    });
};
