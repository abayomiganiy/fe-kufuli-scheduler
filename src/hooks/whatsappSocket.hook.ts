import { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { useGetUser } from "./user.hook";

export const useWhatsappSocket = ({
    name,
}: {
    onClose: () => void;
    name: string;
}) => {
    const [connectionEvent, setConnectionEvent] = useState<string>();
    const socketRef = useRef<ReturnType<typeof socket> | null>(null);
    const { data: user } = useGetUser();

    const initializeSocket = useCallback(() => {
        if (!name || socketRef.current) return;
        socketRef.current = socket({
            session_id: `${import.meta.env.VITE_KUFULI_USER_ID}-${
                user?.id
            }-${name}`,
        });

        const handleError = (error: Error) =>
            console.error("Socket error:", error);
        const handleUpdate = (data: { data: { data: string } }) =>
            setConnectionEvent(data.data.data);

        socketRef.current.on("error", handleError);
        socketRef.current.on("connection.update", handleUpdate);

        return () => {
            if (socketRef.current) {
                socketRef.current.off("error", handleError);
                socketRef.current.off("connection.update", handleUpdate);
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [name, user]);

    useEffect(() => {
        const cleanup = initializeSocket();
        return () => cleanup?.();
    }, [initializeSocket]);

    return {
        initializeSocket,
        connectionEvent,
    };
};
