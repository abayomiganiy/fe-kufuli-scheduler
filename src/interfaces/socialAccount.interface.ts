export type ConnectionNameTypes =
    | "WHATSAPP"
    | "FACEBOOK"
    | "INSTAGRAM"
    | "TIKTOK"
    | "TELEGRAM"
    | "X";

export type ConnectionType = {
    type: ConnectionNameTypes;
    icon: string;
    available: boolean;
    handleConnect: () => void;
};

export type ISocialAccount = {
    type: ConnectionNameTypes;
    id: string;
    name: string;
    status: string;
    icon: string;
    dp?: string;
};
