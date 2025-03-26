import { useEffect, useRef, useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { IQRConnectionData } from "../components/whatsappConnectionFlow/ConnectQRCode";
import { IPhoneNumberData } from "../components/whatsappConnectionFlow/PhoneNumber";
import { socket } from "../socket";
import { useGetUser } from "./user.hook";

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
    const { data: user } = useGetUser();

    useEffect(() => {
        if (connectionUpdate?.data.data === "connected") onClose();

        if (!socketRef.current) {
            socketRef.current = socket({
                session_id: `${import.meta.env.VITE_KUFULI_USER_ID}-${
                    user?.id
                }-${getValues().name}`,
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
    }, [connectionUpdate?.data.data, getValues, onClose, user?.id]);

    return {
        socketRef,
        setConnectionUpdate,
    };
};
