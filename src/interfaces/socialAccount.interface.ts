export type ConnectionNameTypes =
    | "WHATSAPP"
    | "FACEBOOK"
    | "INSTAGRAM"
    | "TIKTOK"
    | "TELEGRAM"
    | "X";

export type ConnectionType = {
    type: ConnectionNameTypes;
    available: boolean;
    handleConnect: () => void;
};

export type ISocialAccount = {
    type: ConnectionNameTypes;
    id: string;
    name: string;
    status: "ACTIVE" | "PENDING" | "DISCONNECTED";
    icon: string;
    dp?: string;
};
