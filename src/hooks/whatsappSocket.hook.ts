import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { UseFormGetValues } from "react-hook-form";
import { IQRConnectionData } from "../components/whatsappConnectionFlow/ConnectQRCode";
import { IPhoneNumberData } from "../components/whatsappConnectionFlow/PhoneNumber";

type DataType =
    | "connected"
    | "disconnected"
    | "wait_for_qrcode_auth"
    | "pulling_wa_data";

export const useWhatsappSocket = ({
    onClose,
    getValues,
}: {
    onClose: () => void;
    getValues: UseFormGetValues<IQRConnectionData | IPhoneNumberData>;
}) => {
    const socketRef = useRef<ReturnType<typeof socket> | null>(null);
    const [connectionUpdate, setConnectionUpdate] = useState<{
        data: {
            status: string;
            message: string;
            data: DataType;
        };
        event: string;
        session_id: string;
    }>();

    useEffect(() => {
        if (connectionUpdate?.data.data === "connected") onClose();

        if (!socketRef.current) {
            socketRef.current = socket({
                session_id: `${import.meta.env.VITE_KUFULI_USER_ID}-${
                    getValues().name
                }`,
            });
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

    return {
        socketRef,
    };
};
