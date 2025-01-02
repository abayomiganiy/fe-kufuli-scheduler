import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import logo from "../../assets/kufuli-logo.svg";
import { useNavigate } from "react-router-dom";

interface LogoProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    onCloseSideNavBar?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className, onCloseSideNavBar }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return (
        <button
            onClick={() => {
                navigate("/");
                queryClient.resetQueries();
                if (onCloseSideNavBar) onCloseSideNavBar();
            }}
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
