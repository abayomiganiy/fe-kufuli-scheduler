import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useState } from "react";
import Button from "../button";
import {
    useQRConnectWhatsapp,
    usePhoneConnectWhatsapp,
} from "../../hooks/socialAccount.hook";
import GridLoader from "react-spinners/GridLoader";
import { useForm } from "react-hook-form";
import qrCode from "../../assets/connect-with-qrcode.png";
import phoneNumber from "../../assets/connect-with-phone.png";

type connectionType = "QR Code" | "Phone Number" | undefined;

const WhatsappConnectionFlow: React.FC<{ onClose: () => void }> = ({
    onClose,
}) => {
    const [connection, setConnection] = useState<connectionType>();
    let component;
    switch (connection) {
        case "QR Code":
            component = <ConnectQRCode onClose={onClose} />;
            break;
        case "Phone Number":
            component = <PhoneNumber onClose={onClose} />;
            break;
        default:
            component = (
                <div className="flex flex-col gap-4 laptop:w-min">
                    <h2 className="font-extrabold laptop:text-3xl text-xl mx-auto">
                        Connect your whatsapp via QR Code or Whatsapp Number
                    </h2>
                    <div className="flex laptop:flex-row flex-col justify-center items-center gap-6">
                        {[
                            {
                                type: "QR Code",
                                icon: <img src={qrCode} alt="QR code" />,
                                instruction: "Proceed to scan QR Code",
                                disabled: false,
                            },
                            {
                                type: "Phone Number",
                                icon: (
                                    <img src={phoneNumber} alt="phone number" />
                                ),
                                instruction:
                                    "Proceed with your whatsapp number",
                                disabled: false,
                            },
                        ].map((connection, index) => (
                            <Button
                                key={index}
                                type="button"
                                className="laptop:w-[300px] laptop:h-[300px] w-full h-full flex flex-col items-center justify-center"
                                disabled={connection.disabled}
                                onClick={() =>
                                    setConnection(
                                        connection.type as connectionType
                                    )
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
                    <div className="font-normal text-xs laptop:text-base">
                        Kufuli ensures optimal security of your whastsapp
                        account and end to end encryption. We use advanced
                        encryption and industry-standard protocols to ensure
                        your social media accounts and personal data remain
                        protected.
                    </div>
                </div>
            );
    }
    return (
        <div className="w-full px-4 laptop:py-0 py-24 laptop:h-auto laptop:overflow-hidden h-screen overflow-y-auto flex flex-col justify-center items-center gap-8">
            {component}
        </div>
    );
};

const ConnectQRCode: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { message } = useQRConnectWhatsapp();
    let component;
    if (message && (message as { qr: string })?.qr) {
        component = (
            <img
                src={(message as { qr: string })?.qr}
                alt="Whatsapp QR Code"
                className="h-[200px] w-[200px]"
            />
        );
    } else if (
        !message ||
        (message &&
            (message as { connection: string })?.connection === "connecting")
    ) {
        component = <GridLoader size={30} color="#3BA0BF" />;
    } else if (
        (message as { connection: string })?.connection === "close" ||
        (message as { isNewLogin: boolean })?.isNewLogin === true
    ) {
        onClose();
    }
    return (
        <div className="flex flex-col justify-center items-center w-screen gap-4">
            {component}
        </div>
    );
};

interface IPhoneNumber {
    phoneNumber: string;
}

const phoneValidationSchema = z
    .object({
        phoneNumber: z.string(),
    })
    .required();

const PhoneNumber: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<IPhoneNumber>({
        resolver: zodResolver(phoneValidationSchema),
    });
    const { message, mutation } = usePhoneConnectWhatsapp();
    const { mutate, isPending } = mutation;
    const onSubmit = () => {
        mutate(getValues());
    };
    let component;
    if (message && (message as { code: string })?.code) {
        component = <div>{(message as { code: string })?.code}</div>;
    } else if (
        (message &&
            (message as { connection: string })?.connection === "connecting") ||
        isPending
    ) {
        component = <GridLoader size={30} color="#3BA0BF" />;
    } else if (
        (message as { connection: string })?.connection === "close" ||
        (message as { isNewLogin: boolean })?.isNewLogin === true
    ) {
        onClose();
    } else {
        component = (
            <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="Enter Whatsapp Number"
                    className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg focus:outline-none focus:border-[#4CCEF7]"
                />
                {errors.phoneNumber && (
                    <p className="text-xs text-red-500">
                        {errors.phoneNumber.message}
                    </p>
                )}
                <Button className=" w-[312px]" disabled={isPending}>
                    {isPending ? "Loading..." : "Connect"}
                </Button>
            </form>
        );
    }
    
    return (
        <div className="flex flex-col justify-center items-center w-screen gap-4">
            {component}
        </div>
    );
};

export default WhatsappConnectionFlow;
