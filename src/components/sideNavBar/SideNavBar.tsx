import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/kufuli-logo.svg";
import { useLogout } from "../../hooks/auth.hook";
import ConnectedSocialAccounts from "./ConnectedSocialAccounts";
import Button from "../button";

interface INavLink {
    label: string;
    icon: React.ReactElement;
    to: string;
}

interface SideNavBarProps {
    showSideNavBar: boolean;
    onCloseSideNavBar: () => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({
    showSideNavBar,
    onCloseSideNavBar,
}) => {
    const { mutate: logout } = useLogout();
    const navLinks: INavLink[] = [
        {
            label: "Dashboard",
            icon: (
                <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.29 10.6765C20.6372 10.6765 22.54 8.77372 22.54 6.42651C22.54 4.0793 20.6372 2.17651 18.29 2.17651C15.9428 2.17651 14.04 4.0793 14.04 6.42651C14.04 8.77372 15.9428 10.6765 18.29 10.6765Z"
                        stroke="#202020"
                        stroke-width="1.5"
                    />
                    <path
                        d="M6.79004 10.6765C9.13725 10.6765 11.04 8.77372 11.04 6.42651C11.04 4.0793 9.13725 2.17651 6.79004 2.17651C4.44283 2.17651 2.54004 4.0793 2.54004 6.42651C2.54004 8.77372 4.44283 10.6765 6.79004 10.6765Z"
                        stroke="#202020"
                        stroke-width="1.5"
                    />
                    <path
                        d="M18.29 22.1765C20.6372 22.1765 22.54 20.2737 22.54 17.9265C22.54 15.5793 20.6372 13.6765 18.29 13.6765C15.9428 13.6765 14.04 15.5793 14.04 17.9265C14.04 20.2737 15.9428 22.1765 18.29 22.1765Z"
                        stroke="#202020"
                        stroke-width="1.5"
                    />
                    <path
                        d="M6.79004 22.1765C9.13725 22.1765 11.04 20.2737 11.04 17.9265C11.04 15.5793 9.13725 13.6765 6.79004 13.6765C4.44283 13.6765 2.54004 15.5793 2.54004 17.9265C2.54004 20.2737 4.44283 22.1765 6.79004 22.1765Z"
                        stroke="#202020"
                        stroke-width="1.5"
                    />
                </svg>
            ),
            to: "/dashboard",
        },
        {
            label: "Campaigns",
            icon: (
                <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.54004 15.7969C3.54004 12.988 3.54004 11.5835 4.21416 10.5747C4.506 10.1379 4.881 9.7629 5.31776 9.47106C6.32665 8.79694 7.73112 8.79694 10.54 8.79694H14.54C17.3489 8.79694 18.7534 8.79694 19.7623 9.47106C20.199 9.7629 20.574 10.1379 20.8659 10.5747C21.54 11.5835 21.54 12.988 21.54 15.7969C21.54 18.6058 21.54 20.0103 20.8659 21.0192C20.574 21.4559 20.199 21.8309 19.7623 22.1228C18.7534 22.7969 17.3489 22.7969 14.54 22.7969H10.54C7.73112 22.7969 6.32665 22.7969 5.31776 22.1228C4.881 21.8309 4.506 21.4559 4.21416 21.0192C3.54004 20.0103 3.54004 18.6058 3.54004 15.7969Z"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M15.7564 16.2088C15.615 16.746 14.9469 17.1256 13.6105 17.8849C12.3186 18.6188 11.6727 18.9858 11.1521 18.8383C10.9369 18.7773 10.7408 18.6615 10.5827 18.5019C10.2002 18.116 10.2002 17.3675 10.2002 15.8704C10.2002 14.3734 10.2002 13.6249 10.5827 13.239C10.7408 13.0794 10.9369 12.9636 11.1521 12.9026C11.6727 12.7551 12.3186 13.1221 13.6105 13.856C14.9469 14.6152 15.615 14.9948 15.7564 15.532C15.8148 15.7538 15.8148 15.9871 15.7564 16.2088Z"
                        stroke="#202020"
                        stroke-width="1.2"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M19.54 8.79694C19.5221 7.55716 19.43 6.85427 18.9582 6.38273C18.3721 5.79694 17.4288 5.79694 15.5422 5.79694H9.53787C7.65122 5.79694 6.7079 5.79694 6.1218 6.38273C5.65 6.85427 5.55798 7.55716 5.54004 8.79694"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M17.54 5.79694C17.54 4.86506 17.54 4.39912 17.3878 4.03157C17.1848 3.54152 16.7954 3.15217 16.3054 2.94918C15.9378 2.79694 15.4719 2.79694 14.54 2.79694H10.54C9.60816 2.79694 9.14222 2.79694 8.77467 2.94918C8.28462 3.15217 7.89527 3.54152 7.69228 4.03157C7.54004 4.39912 7.54004 4.86506 7.54004 5.79694"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            ),
            to: "/campaigns",
        },
        {
            label: "Influencers",
            icon: (
                <svg
                    width="25"
                    height="30"
                    viewBox="0 0 25 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.54 27.0378C18.0628 27.0378 22.54 22.5606 22.54 17.0378C22.54 11.5149 18.0628 7.03778 12.54 7.03778C7.01719 7.03778 2.54004 11.5149 2.54004 17.0378C2.54004 18.4167 2.81911 19.7304 3.32386 20.9255C3.60282 21.5859 3.7423 21.9162 3.75957 22.1658C3.77684 22.4154 3.70338 22.6899 3.55646 23.239L2.54004 27.0378L6.33881 26.0214C6.88792 25.8745 7.16248 25.801 7.41206 25.8183C7.66165 25.8355 7.99189 25.975 8.65239 26.254C9.84749 26.7587 11.1611 27.0378 12.54 27.0378Z"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9.12819 17.4151L9.99913 16.3334C10.3662 15.8775 10.8199 15.4531 10.8555 14.846C10.8644 14.6927 10.7566 14.0044 10.5408 12.6276C10.456 12.0866 9.9509 12.0378 9.51336 12.0378C8.94318 12.0378 8.65809 12.0378 8.37499 12.1671C8.01718 12.3305 7.64983 12.7901 7.56921 13.1751C7.50543 13.4797 7.55283 13.6897 7.64763 14.1095C8.05027 15.8926 8.99485 17.6536 10.4595 19.1183C11.9242 20.583 13.6852 21.5276 15.4683 21.9302C15.8881 22.025 16.098 22.0724 16.4027 22.0086C16.7877 21.928 17.2472 21.5607 17.4107 21.2028C17.54 20.9197 17.54 20.6347 17.54 20.0645C17.54 19.6269 17.4912 19.1218 16.9501 19.037C15.5734 18.8212 14.8851 18.7134 14.7317 18.7223C14.1247 18.7579 13.7003 19.2116 13.2444 19.5787L12.1627 20.4496"
                        stroke="#202020"
                        stroke-width="1.5"
                    />
                    <path
                        d="M7 2.53778L11.5 7.03778L17.5 1.03778"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            ),
            to: "/influencers",
        },
    ];

    return (
        <div>
            <div
                className={`fixed z-[100] top-0 left-0 h-dvh w-screen bg-[#00000099] laptop:hidden ${
                    showSideNavBar ? "flex" : "hidden"
                }`}
                onClick={() => onCloseSideNavBar()}
            ></div>
            <div
                className={`fixed z-[100] top-0 left-0 laptop:flex flex-col gap-12 laptop:pt-8 pt-4 shadow-2xl ${
                    showSideNavBar ? "flex" : "hidden"
                } w-72 h-dvh px-4 bg-white`}
            >
                <div className="flex laptop:justify-center justify-start">
                    <img src={logo} alt="logo" className="laptop:h-14 h-8 laptop:w-48" />
                </div>
                <div className="flex flex-col gap-5">
                    <Button variant="primary" type="button" className="w-full">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.7295 8.17651V16.1765M16.7295 12.1765H8.72949"
                                stroke="#202020"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M22.7295 12.1765C22.7295 6.65366 18.2523 2.17651 12.7295 2.17651C7.20664 2.17651 2.72949 6.65366 2.72949 12.1765C2.72949 17.6993 7.20664 22.1765 12.7295 22.1765C18.2523 22.1765 22.7295 17.6993 22.7295 12.1765Z"
                                stroke="#202020"
                                stroke-width="1.5"
                            />
                        </svg>
                        New campaign
                    </Button>
                    {/* Menu items */}
                    <ul>
                        {navLinks.map((navLink, index) => (
                            <li key={index} className="font-semibold text-xl">
                                <NavLink
                                    to={navLink.to}
                                    className="flex items-center px-4 gap-2 p-2 h-14 text-sm text-gray-800 hover:text-gray-900 aria-[current=page]:bg-[#E5E8F9] hover:bg-[#E5E8F9] mx-[-16px]"
                                    onClick={() => onCloseSideNavBar()}
                                >
                                    {navLink.icon}
                                    {navLink.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-3 items-start absolute bottom-12 w-60">
                    <ConnectedSocialAccounts />
                    <button
                        onClick={() => {
                            logout();
                        }}
                        className="flex justify-center items-center gap-2 h-14 font-bold text-xl text-[#FF3B30]"
                    >
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.54 3.59502C14.083 3.53241 13.6155 3.5 13.14 3.5C7.83811 3.5 3.54004 7.52944 3.54004 12.5C3.54004 17.4706 7.83811 21.5 13.14 21.5C13.6155 21.5 14.083 21.4676 14.54 21.405"
                                stroke="#FF3B30"
                                stroke-width="1.5"
                                stroke-linecap="round"
                            />
                            <path
                                d="M21.54 12.5H11.54M21.54 12.5C21.54 11.7998 19.5457 10.4915 19.04 10M21.54 12.5C21.54 13.2002 19.5457 14.5085 19.04 15"
                                stroke="#FF3B30"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideNavBar;
