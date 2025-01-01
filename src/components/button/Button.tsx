import React, { ButtonHTMLAttributes } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    isLoading?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    onClick,
    isLoading = false,
    children,
}) => {
    return (
        <button
            className={`flex justify-center items-center gap-2 p-3 ${
                size === 'sm' ? 'h-10' : size === 'lg' ? 'h-16' : 'h-12'
            } font-semibold laptop:text-xl text-[12px] rounded-lg disabled:bg-[#E0E0E0] disabled:text-black ${
                variant === 'primary' && !disabled
                    ? 'bg-gradient-to-bl from-[#91FFDB] to-[#4CCEF7] hover:from-[#4CCEF7] hover:to-[#91FFDB]'
                    : 'bg-black text-white'
            } ${className}`}
            disabled={disabled || isLoading}
            onClick={onClick}
        >
            {isLoading && <BounceLoader size={20} />}
            {children}
        </button>
    );
};

export default Button;