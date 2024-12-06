import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useResendVerifyEmail, useVerifyEmail } from "../../hooks/email.hook";
import Button from "../../components/button";

interface IVerificationData {
    verificationCode: string;
    email: string;
}

const verificationValidationSchema = z
    .object({
        verificationCode: z.string().min(6).max(6),
        email: z.string().email(),
    })
    .required({
        verificationCode: true,
        email: true,
    });

const VerifyAccount: React.FC = () => {
    const emailToVerify = localStorage.getItem("emailToVerify")!;
    const { mutate: verify } = useVerifyEmail();
    const { mutate: resendVerification } = useResendVerifyEmail();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IVerificationData>({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        defaultValues: {
            verificationCode: "",
            email: emailToVerify,
        },
        resolver: zodResolver(verificationValidationSchema),
    });

    const onSubmit = (data: IVerificationData) => {
        // API call to verify account
        verify(data);
    };

    return (
        <div className="flex flex-row h-lvh relative">
            <div className="w-full py-16 px-4 flex justify-center">
                <>
                    <svg
                        width="567"
                        height="645"
                        viewBox="0 0 567 645"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-0 blur-3xl opacity-40 laptop:block hidden z-10"
                    >
                        <ellipse
                            cx="248.806"
                            cy="322.5"
                            rx="322.5"
                            ry="317.806"
                            transform="rotate(90 248.806 322.5)"
                            fill="#C5FFEA"
                        />
                    </svg>
                    <svg
                        width="112"
                        height="323"
                        viewBox="0 0 112 323"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-0 blur-3xl opacity-40 laptop:hidden block z-10"
                    >
                        <ellipse
                            cx="-47.5968"
                            cy="161.25"
                            rx="161.25"
                            ry="158.903"
                            transform="rotate(90 -47.5968 161.25)"
                            fill="#C5FFEA"
                        />
                    </svg>
                    <svg
                        width="111"
                        height="323"
                        viewBox="0 0 111 323"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 bottom-1 blur-2xl opacity-40 laptop:hidden block z-10"
                    >
                        <ellipse
                            cx="158.903"
                            cy="161.25"
                            rx="161.25"
                            ry="158.903"
                            transform="rotate(90 158.903 161.25)"
                            fill="#ACDCFF"
                        />
                    </svg>
                    <svg
                        width="568"
                        height="378"
                        viewBox="0 0 568 378"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 bottom-0 blur-3xl opacity-40 laptop:block hidden z-10"
                    >
                        <ellipse
                            cx="317.806"
                            cy="322.5"
                            rx="322.5"
                            ry="317.806"
                            transform="rotate(90 317.806 322.5)"
                            fill="#ACDCFF"
                        />
                    </svg>
                </>
                <div className="flex flex-col laptop:items-center laptop:gap-6 gap-11 px-1 z-10">
                    <div>
                        <img src="/kufuli-logo.svg" alt="kufuli-logo" />
                    </div>
                    <div className="w-full flex flex-col gap-6 px-1 z-10">
                        <div className="flex flex-col gap-2 laptop:text-center">
                            <h1 className="font-extrabold laptop:text-5xl text-4xl">
                                Verify Your Account
                            </h1>
                            <p className="laptop:text-xl text-base laptop:w-[444px]">
                                We've sent a verification code to your email.
                                Enter it below to activate your account.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-6 laptop:w-[444px] laptop:mx-auto"
                        >
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold laptop:text-base text-xs">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    {...register("verificationCode")}
                                    placeholder="Enter Verification Code"
                                    className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg focus:outline-none focus:border-[#4CCEF7]"
                                />
                                {errors.verificationCode && (
                                    <p className="text-xs text-red-500">
                                        {errors.verificationCode.message}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" className="">
                                Verify
                            </Button>
                        </form>
                        <div className="flex justify-center items-center gap-2 laptop:text-base text-xs">
                            <span>Didn't receive the code?</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    resendVerification({
                                        email: emailToVerify,
                                    });
                                }}
                                className="font-extrabold"
                            >
                                Resend Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
