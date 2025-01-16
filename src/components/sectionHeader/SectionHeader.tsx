import React from "react";
import { Link } from "react-router-dom";

const SectionHeader: React.FC<{
    title: string;
    icon?: React.ReactElement;
    link?: string;
}> = ({ title, icon, link }) => {
    return (
        <div className="flex justify-between items-center h-14 select-none">
            <h1 className="flex items-center gap-2 font-semibold laptop:text-2xl text-xl">
                {icon}
                {title}
            </h1>
            {link && (
                <Link
                    to={link}
                    className="font-normal laptop:text-xl text-base"
                >
                    See All
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;
