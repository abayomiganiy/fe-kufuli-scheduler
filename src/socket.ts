import { io } from "socket.io-client";

export const socket = ({ session_id }: { session_id: string }) =>
    io(
        `${
            import.meta.env.VITE_KUFULI_WHATSAPP_BASE_URL
        }?session_id=${session_id}`,
        {
            extraHeaders: {
                "x-api-key": import.meta.env.VITE_KUFULI_API_KEY,
                "x-api-secret": import.meta.env.VITE_KUFULI_API_SECRET,
            },
        }
    );
