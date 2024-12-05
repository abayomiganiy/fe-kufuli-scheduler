import React from "react";
import { useNavigate } from "react-router-dom";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import telegram from "../../assets/telegram.png";
import tiktok from "../../assets/tiktok.png";
import whatsapp from "../../assets/whatsapp.png";
import x from "../../assets/x.png";

type ConnectionNameTypes =
    | "WhatsApp"
    | "Facebook"
    | "Instagram"
    | "TikTok"
    | "Telegram"
    | "X";

type ConnectionType = {
    name: ConnectionNameTypes;
    icon: string;
    available: boolean;
    handleConnect: () => void;
};

type ConnectedAccountType = {
    connection: ConnectionType;
    accounts: {
        id: string;
        dp: string;
        lastUpdated: Date;
    }[];
};

const ConnectAccount: React.FC = () => {
    const navigate = useNavigate();
    const connections: ConnectionType[] = [
        {
            name: "WhatsApp",
            icon: whatsapp,
            available: true,
            handleConnect: () => {
                console.log("Whatsapp");
            },
        },
        {
            name: "Facebook",
            icon: facebook,
            available: false,
            handleConnect: () => {
                console.log("Facebook");
            },
        },
        {
            name: "Instagram",
            icon: instagram,
            available: false,
            handleConnect: () => {
                console.log("Instagram");
            },
        },
        {
            name: "X",
            icon: x,
            available: false,
            handleConnect: () => {
                console.log("X");
            },
        },
        {
            name: "TikTok",
            icon: tiktok,
            available: false,
            handleConnect: () => {
                console.log("TikTok");
            },
        },
        {
            name: "Telegram",
            icon: telegram,
            available: false,
            handleConnect: () => {
                console.log("Telegram");
            },
        },
    ];

    const connectedAccounts: ConnectedAccountType[] = [
        {
            connection: connections[0],
            accounts: [
                {
                    id: "123456789",
                    dp: whatsapp,
                    lastUpdated: new Date("1995-08-21T12:37:00"),
                },
            ],
        },
        {
            connection: connections[1],
            accounts: [
                {
                    id: "123456789",
                    dp: instagram,
                    lastUpdated: new Date("1995-08-21T12:37:00"),
                },
            ],
        },
    ];

    return (
        <div className="flex laptop:flex-row flex-col">
            <div className="laptop:w-4/5 w-full py-16 px-4 flex justify-center overflow-x-hidden">
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
                <div className="flex flex-col laptop:items-center laptop:gap-6 gap-11z-10">
                    <div>
                        <img src="/kufuli-logo.svg" alt="kufuli-logo" />
                    </div>
                    <div className="laptop:w-3/5 flex flex-col gap-6 z-10">
                        <div className="flex flex-col gap-6 laptop:text-center">
                            <div className="flex flex-col gap-3z-10">
                                <h1 className="font-extrabold laptop:text-5xl text-4xl">
                                    Connect Your Social Media Accounts
                                </h1>
                                <p className="laptop:text-xl text-base">
                                    Link your platforms to start monetizing and
                                    managing your stories effortlessly. Kufuli
                                    supports multiple accounts across multiple
                                    platforms.
                                </p>
                            </div>
                            <Connections connections={connections} />
                            {connectedAccounts.length ? (
                                <div className="laptop:max-w-xl mx-auto w-[90svw]">
                                    <ConnectedAccounts
                                        connectedAccounts={connectedAccounts}
                                    />
                                </div>
                            ) : null}
                            <div className="">
                                <div className="flex flex-col laptop:gap-4 gap-3 laptop:w-4/5 mx-auto">
                                    <button
                                        className={`${
                                            connectedAccounts.length
                                                ? "flex"
                                                : "hidden"
                                        } h-12 items-center justify-center gap-2 font-semibold laptop:text-xl text-base rounded-lg focus:border-2 focus:outline-none bg-gradient-to-bl from-[#91FFDB] to-[#4CCEF7] hover:from-[#4CCEF7] hover:to-[#91FFDB] focus:border-[#4CCEF7]`}
                                    >
                                        <span>Add another account</span>
                                        <svg
                                            width="25"
                                            height="24"
                                            viewBox="0 0 25 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.28821 10.3058C3.90015 9.23176 3.70612 8.69476 3.78886 8.35065C3.87935 7.97427 4.14702 7.68084 4.48915 7.58296C4.80195 7.49346 5.28855 7.70973 6.26175 8.14227C7.12255 8.52486 7.55295 8.71615 7.95734 8.70551C8.40259 8.69379 8.8309 8.51524 9.17162 8.19931C9.48107 7.91237 9.68863 7.45513 10.1037 6.54064L11.0186 4.52525C11.7828 2.84175 12.1649 2 12.77 2C13.3751 2 13.7572 2.84175 14.5214 4.52525L15.4363 6.54064C15.8514 7.45513 16.059 7.91237 16.3684 8.19931C16.7091 8.51524 17.1374 8.69379 17.5827 8.70551C17.9871 8.71615 18.4175 8.52486 19.2783 8.14227C20.2515 7.70973 20.7381 7.49346 21.0509 7.58296C21.393 7.68084 21.6607 7.97427 21.7512 8.35065C21.8339 8.69476 21.6399 9.23176 21.2518 10.3057L19.5838 14.9222C18.8702 16.897 18.5135 17.8844 17.7668 18.4422C17.0202 19 16.0554 19 14.1258 19H11.4142C9.48461 19 8.51979 19 7.77317 18.4422C7.02656 17.8844 6.66979 16.897 5.95624 14.9222L4.28821 10.3058Z"
                                                stroke="#141B34"
                                                stroke-width="2"
                                            />
                                            <path
                                                d="M12.77 14H12.779"
                                                stroke="#141B34"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M7.77002 22H17.77"
                                                stroke="#141B34"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        disabled={!connectedAccounts.length}
                                        className="h-12 font-semibold laptop:text-xl text-base rounded-lg focus:border-2 focus:outline-none bg-black text-white disabled:bg-[#E0E0E0] disabled:text-black"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-2 laptop:text-base text-xs">
                                <span>Not ready to connect now?</span>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem(
                                            "showConnectAccount"
                                        );
                                        navigate("/");
                                    }}
                                    className="font-extrabold"
                                >
                                    Skip and Do This Later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="laptop:w-1/5 flex flex-col gap-7 laptop:mr-24 my-auto">
                <div className="rounded-2xl py-6 px-4 laptop:w-80 w-[90%] mx-auto bg-gradient-to-bl from-[#91FFDB] to-[#4CCEF7]">
                    <h3 className="font-bold text-sm">Why Connect?</h3>
                    <ul className="font-normal text-sm">
                        <li>Maximize your reach and earnings.</li>
                        <li>Manage all your accounts in one place.</li>
                        <li>Unlock tailored analytics for your content.</li>
                    </ul>
                </div>
                <div className="rounded-2xl py-6 px-4 laptop:w-80 w-[90%] mx-auto bg-gradient-to-tl from-[#205CE2] to-[#4CC1FF]">
                    <h3 className="font-bold text-sm">Why Connect?</h3>
                    <ul className="font-normal text-sm">
                        <li>Maximize your reach and earnings.</li>
                        <li>Manage all your accounts in one place.</li>
                        <li>Unlock tailored analytics for your content.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Connections: React.FC<{ connections: ConnectionType[] }> = ({
    connections,
}) => {
    return (
        <div className="flex flex-wrap justify-center laptop:gap-10 gap-8">
            {connections.map((connection, index) => (
                <button
                    key={index}
                    className={`h-14 w-14 relative ${
                        !connection.available && "grayscale"
                    }`}
                    disabled={!connection.available}
                    onClick={connection.handleConnect}
                >
                    <div className="w-5 h-5 rounded-full bg-[#FF3B30] flex justify-center items-center absolute bottom-0 right-0">
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.75012 2.5V10.5"
                                stroke="white"
                                stroke-width="2.25"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M2.75 6.5H10.75"
                                stroke="white"
                                stroke-width="2.25"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                    <img
                        src={connection.icon}
                        alt={connection.name}
                        className="object-contain rounded-full"
                    />
                </button>
            ))}
        </div>
    );
};

const ConnectedAccounts: React.FC<{
    connectedAccounts: ConnectedAccountType[];
}> = ({ connectedAccounts }) => {
    return (
        <div className="rounded-2xl flex overflow-auto no-scrollbar py-8 bg-white border-[#E0E0E0] border-[1px]">
            <div className="flex flex-nowrap">
                {connectedAccounts.map((connectedAccount, index) => (
                    <ConnectedAccount
                        key={index}
                        connectedAccount={connectedAccount}
                    />
                ))}
            </div>
        </div>
    );
};

const ConnectedAccount: React.FC<{
    connectedAccount: ConnectedAccountType;
}> = ({ connectedAccount }) => {
    return (
        <div className="relative w-20 h-20 mx-3">
            <div className="w-5 h-5 rounded-full bg-[#fff] p-[1px] flex justify-center items-center absolute bottom-0 right-0">
                <img
                    src={connectedAccount.accounts[0].dp}
                    alt={connectedAccount.accounts[0].id}
                    className="object-contain w-full h-full"
                />
            </div>
            <img
                src={connectedAccount.connection.icon}
                alt={connectedAccount.connection.name}
                className="object-contain w-full h-full"
            />
        </div>
    );
};

export default ConnectAccount;
