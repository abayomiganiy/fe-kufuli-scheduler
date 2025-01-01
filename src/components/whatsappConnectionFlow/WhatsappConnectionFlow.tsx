import React, { useState } from "react";
import phoneNumber from "../../assets/connect-with-phone.png";
import qrCode from "../../assets/connect-with-qrcode.png";
import Button from "../button";
import ConnectQRCode from "./ConnectQRCode";
import PhoneNumber from "./PhoneNumber";

export type connectionType = "QR Code" | "Phone Number" | undefined;

interface WhatsappConnectionFlowProps {
    onClose: () => void;
}

const WhatsappConnectionFlow: React.FC<WhatsappConnectionFlowProps> = ({
    onClose,
}) => {
    const [connection, setConnection] = useState<connectionType>();
    let component;
    switch (connection) {
        case "QR Code":
            component = (
                <ConnectQRCode
                    onClose={onClose}
                    setConnection={setConnection}
                />
            );
            break;
        case "Phone Number":
            component = (
                <PhoneNumber onClose={onClose} setConnection={setConnection} />
            );
            break;
        default:
            component = (
                <div className="w-full flex laptop:flex-row flex-col justify-center items-center gap-6">
                    {[
                        {
                            type: "QR Code",
                            icon: <img src={qrCode} alt="QR code" />,
                            instruction: "Proceed to scan QR Code",
                            disabled: false,
                        },
                        {
                            type: "Phone Number",
                            icon: <img src={phoneNumber} alt="phone number" />,
                            instruction: "Proceed with your whatsapp number",
                            disabled: false,
                        },
                    ].map((connection, index) => (
                        <Button
                            key={index}
                            type="button"
                            className="laptop:w-[300px] laptop:h-[300px] w-full h-full flex flex-col items-center justify-center"
                            disabled={connection.disabled}
                            onClick={() =>
                                setConnection(connection.type as connectionType)
                            }
                        >
                            <div className="font-semibold text-base laptop:text-xl">
                                {connection.type}
                            </div>
                            <div>{connection.icon}</div>
                            <div className="font-medium text-xs laptop:text-base">
                                {connection.instruction}
                            </div>
                        </Button>
                    ))}
                </div>
            );
    }
    return (
        <div className="flex flex-col laptop:w-min px-4 laptop:py-0 py-24 laptop:h-auto laptop:overflow-hidden h-screen overflow-y-auto justify-center items-center gap-8">
            <h2 className="font-extrabold laptop:text-3xl text-xl mx-auto">
                Connect your whatsapp via QR Code or Whatsapp Number
            </h2>
            <div className="w-full laptop:w-[612px] flex flex-col justify-center items-center gap-4">
                {component}
            </div>
            <div className="font-normal text-xs laptop:text-base">
                Kufuli ensures optimal security of your whastsapp account and
                end to end encryption. We use advanced encryption and
                industry-standard protocols to ensure your social media accounts
                and personal data remain protected.
            </div>
        </div>
    );
};

export default WhatsappConnectionFlow;
