import { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { useGetUser } from "./user.hook";
import { useDebounce } from "../utils/debounce";

export const useWhatsappSocket = ({
    name,
}: {
    onClose: () => void;
    name: string;
}) => {
    const [connectionEvent, setConnectionEvent] = useState<string>();
    const socketRef = useRef<ReturnType<typeof socket> | null>(null);
    const { data: user } = useGetUser();
    const [debouncedName, setDebouncedName] = useState(name);

    // Debounce the name changes
    const debouncedSetName = useDebounce((newName: unknown) => {
        if (typeof newName === "string") {
            setDebouncedName(newName);
        }
    }, 500);

    useEffect(() => {
        debouncedSetName(name);
    }, [name, debouncedSetName]);

    const initializeSocket = useCallback(() => {
        if (!debouncedName || socketRef.current) return;
        socketRef.current = socket({
            session_id: `${import.meta.env.VITE_KUFULI_USER_ID}-${
                user?.id
            }-${debouncedName}`,
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
    }, [debouncedName, user]);

    useEffect(() => {
        const cleanup = initializeSocket();
        return () => cleanup?.();
    }, [initializeSocket]);

    return {
        initializeSocket,
        connectionEvent,
    };
};
