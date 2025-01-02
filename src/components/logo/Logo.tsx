import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import logo from "../../assets/kufuli-logo.svg";

interface LogoProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    const queryClient = useQueryClient();

    return (
        <button
            onClick={() => queryClient.resetQueries()}
            className={`${className} flex laptop:justify-center justify-start`}
        >
            <img
                src={logo}
                alt="logo"
                className="laptop:h-14 h-8 laptop:w-48"
            />
        </button>
    );
};

export default Logo;
