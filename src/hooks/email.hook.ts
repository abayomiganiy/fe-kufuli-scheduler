import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/axios-utils";
import toast from "react-hot-toast";

export const useVerifyEmail = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["verify-email"],
        mutationFn: async ({
            email,
            verificationCode,
        }: {
            email: string;
            verificationCode: string;
        }) => {
            const resp = await request({
                url: "/email/verify-email",
                method: "POST",
                data: {
                    email,
                    verificationCode,
                },
            });
            return resp;
        },
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
        mutationFn: async ({ email }: { email: string }) => {
            const resp = await request({
                url: "/email/resend-verify-email",
                method: "POST",
                data: {
                    email,
                },
            });
            return resp;
        },
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
