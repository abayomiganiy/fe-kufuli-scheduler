import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import GridLoader from "react-spinners/GridLoader";
import { z } from "zod";
import { useConnectSocialAccount } from "../../hooks/socialAccount.hook";
import { socket } from "../../socket";
import Button from "../button";
import { connectionType } from "./WhatsappConnectionFlow";

interface IConnectionData {
    name: string;
    type: "WHATSAPP";
}

const connectionValidationSchema = z
    .object({
        name: z.string().max(10).min(3),
        type: z.string(),
    })
    .required();

const ConnectQRCode: React.FC<{
    onClose: () => void;
    setConnection: (
        connectionType: React.SetStateAction<connectionType>
    ) => void;
}> = ({ onClose, setConnection }) => {
    const socketRef = useRef<ReturnType<typeof socket> | null>(null);
    const [connectionUpdate, setConnectionUpdate] = useState<{
        data: {
            status: string;
            message: string;
            data:
                | "connected"
                | "disconnected"
                | "wait_for_qrcode_auth"
                | "pulling_wa_data";
        };
        event: string;
        session_id: string;
    }>();
    const {
        mutate: connect,
        data: connectionData,
        isPending: connectionIsPending,
    } = useConnectSocialAccount();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<IConnectionData>({
        resolver: zodResolver(connectionValidationSchema),
        defaultValues: {
            name: "",
            type: "WHATSAPP",
        },
    });

    const onSubmit = (data: IConnectionData) => {
        if (!socketRef.current) {
            socketRef.current = socket({
                session_id: `${import.meta.env.VITE_KUFULI_USER_ID}-${
                    data.name
                }`,
            });
        }
        console.log(data);
        connect(data);
    };

    useEffect(() => {
        if (connectionUpdate?.data.data === "connected") onClose();

        if (!socketRef.current) {
            socketRef.current = socket({
                session_id: `${import.meta.env.VITE_KUFULI_USER_ID}-${
                    getValues().name
                }`,
            });

            // socketRef.current.on("connect", () => setIsConnected(true));
            // socketRef.current.on("disconnect", () => setIsConnected(false));
            socketRef.current.on("error", (error) =>
                console.error("Socket error:", error)
            );
            socketRef.current.on("connection.update", (data) =>
                setConnectionUpdate(data)
            );
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [connectionUpdate?.data.data, getValues, onClose]);

    if (connectionIsPending) {
        return <GridLoader size={30} color="#3BA0BF" />;
    }

    if (!connectionIsPending) {
        console.log("connectionData: ", connectionData);
    }

    let component;
    switch (true) {
        case connectionData && "pulling_wa_data" in connectionData:
            component = "Pulling data";
            break;
        case connectionData && "wait_for_qrcode_auth" in connectionData:
            component = "wait for qrcode auth";
            break;
        case connectionData && "qr" in connectionData:
            component = (
                <>
                    {
                        <div>
                            <img
                                src={connectionData?.qr}
                                alt="Whatsapp QR Code"
                                className="h-[200px] w-[200px]"
                            />
                        </div>
                    }
                </>
            );
            break;
        default:
            component = (
                <form
                    className="w-full flex flex-col items-center gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Enter name"
                        className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg focus:outline-none focus:border-[#4CCEF7]"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                    <Button className="w-full" disabled={connectionIsPending}>
                        {connectionIsPending ? "Pending..." : "Connect"}
                    </Button>
                    <button
                        type="button"
                        onClick={() => setConnection("Phone Number")}
                        className="font-semibold text-xs laptop:text-base"
                    >
                        Use phone number instead
                    </button>
                </form>
            );
            break;
    }

    return (
        <div className="w-full flex justify-center items-center">
            {component}
        </div>
    );
};

export default ConnectQRCode;
