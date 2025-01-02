import { request } from "../utils/axios-utils";

export const verifyEmail = async ({
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
};

export const resendVerifyEmail = async ({ email }: { email: string }) => {
    const resp = await request({
        url: "/email/resend-verify-email",
        method: "POST",
        data: {
            email,
        },
    });
    return resp;
};
