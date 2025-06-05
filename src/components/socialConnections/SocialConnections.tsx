import { useState } from "react";
import { ConnectionType } from "../../interfaces/socialAccount.interface";
import { getAccountImageWithType } from "../../utils/getAccountImageWithType";
import Modal from "../modal";
import WhatsappConnectionFlow from "../whatsappConnectionFlow";

const Connections: React.FC = () => {
    const [showModal, setShowModal] = useState({
        isOpen: false,
        accountType: "",
    });
    const closeModal = () => setShowModal({ isOpen: false, accountType: "" });
    const connections: ConnectionType[] = [
        {
            type: "WHATSAPP",
            available: true,
            handleConnect: () => {
                setShowModal({ isOpen: true, accountType: "WHATSAPP" });
                // refetch();
            },
        },
        {
            type: "FACEBOOK",
            available: false,
            handleConnect: () => {
                console.log("Facebook");
            },
        },
        {
            type: "INSTAGRAM",
            available: false,
            handleConnect: () => {
                console.log("Instagram");
            },
        },
        {
            type: "X",
            available: false,
            handleConnect: () => {
                console.log("X");
            },
        },
        {
            type: "TIKTOK",
            available: false,
            handleConnect: () => {
                console.log("TikTok");
            },
        },
        {
            type: "TELEGRAM",
            available: false,
            handleConnect: () => {
                console.log("Telegram");
            },
        },
    ];
    return (
        <>
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
                                    strokeWidth="2.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M2.75 6.5H10.75"
                                    stroke="white"
                                    strokeWidth="2.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <img
                            src={getAccountImageWithType(connection.type)}
                            alt={connection.type}
                            className="object-contain rounded-full"
                        />
                    </button>
                ))}
            </div>
            {showModal.isOpen && (
                <Modal isOpen={showModal.isOpen} onClose={closeModal}>
                    {showModal.accountType === "WHATSAPP" && (
                        <WhatsappConnectionFlow onClose={closeModal} />
                    )}
                </Modal>
            )}
        </>
    );
};

export default Connections;
