import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const Button: React.FC<IButton> = ({
    children,
    variant = "primary",
    className = "",
    disabled = false,
    onClick,
}) => {
    return (
        <button
            className={`flex justify-center items-center gap-2 p-3 h-12 font-semibold laptop:text-xl text-base rounded-lg disabled:bg-[#E0E0E0] disabled:text-black
                ${
                    variant === "primary" && !disabled
                        ? "bg-gradient-to-bl from-[#91FFDB] to-[#4CCEF7] hover:from-[#4CCEF7] hover:to-[#91FFDB]"
                        : "bg-black text-white"
                }
            ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
