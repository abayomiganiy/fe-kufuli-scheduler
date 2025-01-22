import React from "react";

interface ModalProps {
    children: React.ReactNode;
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
    children,
    isOpen,
    className,
    onClose,
}) => {
    return (
        <div
            className={`h-screen w-screen ${
                isOpen ? "flex" : "hidden"
            } justify-center items-center fixed top-0 left-0 z-50`}
        >
            <div className="absolute top-0 left-0 h-screen w-screen bg-[#00000099] opacity-90"></div>
            <div
                className={`${className} flex justify-center items-center overflow-y-auto py-16 relative laptop:min-w-[1000px] laptop:max-w-[1000px] min-h-96 bg-white rounded-3xl`}
            >
                <button
                    className="absolute right-5 laptop:top-5 top-16"
                    onClick={onClose}
                >
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M30 18L24 24M24 24L18 30M24 24L30 30M24 24L18 18"
                            stroke="#202020"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M4 24C4 35.0456 12.9543 44 24 44C35.0456 44 44 35.0456 44 24C44 12.9543 35.0456 3.99994 24 3.99994"
                            stroke="#202020"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5 16.9999C5.72478 15.3411 6.6378 13.7833 7.71202 12.3535M12.3536 7.71192C13.7834 6.6377 15.3412 5.72472 17 4.99994"
                            stroke="#202020"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
