import React from "react";

interface ToggleProps {
    isOn: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ isOn }) => {
    return (
        <div>
            <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0_24_582)">
                    <rect
                        width="40"
                        height="20"
                        rx="10"
                        fill={isOn ? "#34C759" : "#787880"}
                    />
                    <g filter="url(#filter0_ddd_24_582)">
                        <rect
                            x={isOn ? "21" : "3px"}
                            y="2"
                            width="16"
                            height="16"
                            rx="8"
                            fill="white"
                        />
                    </g>
                </g>
                <defs>
                    <filter
                        id="filter0_ddd_24_582"
                        x={isOn ? "-3" : "21"}
                        y="-2"
                        width="40"
                        height="20"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy="1.92" />
                        <feGaussianBlur stdDeviation="0.32" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_24_582"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy="1.92" />
                        <feGaussianBlur stdDeviation="2.56" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="effect1_dropShadow_24_582"
                            result="effect2_dropShadow_24_582"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feMorphology
                            radius="0.64"
                            operator="dilate"
                            in="SourceAlpha"
                            result="effect3_dropShadow_24_582"
                        />
                        <feOffset />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="effect2_dropShadow_24_582"
                            result="effect3_dropShadow_24_582"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect3_dropShadow_24_582"
                            result="shape"
                        />
                    </filter>
                    <clipPath id="clip0_24_582">
                        <rect width="40" height="20" rx="10" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default Toggle;
