import React from "react";
import signUpPng from "../../assets/communication-social-media-icons-smartphone-device1.png";
import { Link } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "../../hooks/auth.hook";
import Button from "../../components/button";

interface ISignUpnData {
    fullName: string;
    email: string;
    password: string;
}

const signUpValidationSchema = z
    .object({
        fullName: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    })
    .required();

const SignUp: React.FC = () => {
    const { mutate: signUp } = useSignUp();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignUpnData>({
        resolver: zodResolver(signUpValidationSchema),
    });

    const onSubmit = (data: ISignUpnData) => {
        // API call to sign up
        signUp(data);
    };

    return (
        <div className="flex flex-row relative">
            <div className="laptop:w-1/2 w-full py-16 px-4 flex justify-center">
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
                </>
                <div className="w-[444px] flex flex-col laptop:gap-6 gap-11 px-1 z-10">
                    <div>
                        <img src="/kufuli-logo.svg" alt="kufuli-logo" />
                    </div>
                    <div className="w-full flex flex-col gap-6 px-1 z-10">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-extrabold laptop:text-5xl text-4xl">
                                Join Kufuli & Unlock Your Potential
                            </h1>
                            <p className="laptop:text-xl text-base">
                                Create an account to monetize your stories,
                                schedule content, and connect with influencers
                                or advertisers.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-6"
                        >
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold laptop:text-base text-xs">
                                    Fullname
                                </label>
                                <input
                                    type="text"
                                    {...register("fullName")}
                                    placeholder="Enter your fullname"
                                    className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg focus:outline-none focus:border-[#4CCEF7]"
                                />
                                {errors.fullName && (
                                    <p className="text-xs text-red-500">
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold laptop:text-base text-xs">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="Enter your email address"
                                    className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg focus:outline-none focus:border-[#4CCEF7]"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold laptop:text-base text-xs">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    placeholder="Enter your password"
                                    className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg focus:outline-none focus:border-[#4CCEF7]"
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex px-2 font-normal  text-xs">
                                I agree to the
                                <Link
                                    to="/terms-and-conditions"
                                    className="mx-1 font-bold"
                                >
                                    Terms and Conditions
                                </Link>
                                and
                                <Link
                                    to="/privacy-policy"
                                    className="ml-1 font-bold"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </div>
                            <Button className="">SignUp</Button>
                        </form>
                        <div className="flex justify-center items-center gap-2 laptop:text-base text-xs">
                            <span>Already have an account?</span>
                            <Link to="/login" className="font-extrabold">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-lvh w-1/2  laptop:flex hidden justify-center items-center bg-gradient-to-bl from-[#91FFDB] to-[#4CCEF7]">
                <img
                    src={signUpPng}
                    alt="communication-social-media-icons-smartphone-device"
                    className="object-contain w-4/5 h-4/5"
                />
            </div>
        </div>
    );
};

export default SignUp;
