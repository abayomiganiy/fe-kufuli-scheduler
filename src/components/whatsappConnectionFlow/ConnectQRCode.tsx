import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GridLoader from "react-spinners/GridLoader";
import { z } from "zod";
import { useConnectSocialAccount } from "../../hooks/socialAccount.hook";
import { useWhatsappSocket } from "../../hooks/whatsappSocket.hook";
import { socket } from "../../socket";
import Button from "../button";
import { connectionType } from "./WhatsappConnectionFlow";

export interface IQRConnectionData {
    name: string;
    type: "WHATSAPP";
    phoneNumber?: string;
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
    } = useForm<IQRConnectionData>({
        resolver: zodResolver(connectionValidationSchema),
        defaultValues: {
            name: "",
            type: "WHATSAPP",
        },
    });

    const { socketRef, setConnectionUpdate } = useWhatsappSocket({
        onClose,
        getValues,
    });

    const onSubmit = (data: IQRConnectionData) => {
        if (!socketRef.current) {
            socketRef.current = socket({
                session_id: `${import.meta.env.VITE_KUFULI_USER_ID}-${
                    data.name
                }`,
            });
        }
        connect(data);
    };

    if (connectionIsPending) {
        return <GridLoader size={30} color="#3BA0BF" />;
    }

    let component;
    switch (true) {
        case connectionData && "pulling_wa_data" in connectionData:
            component = "Pulling data";
            break;
        case connectionData && "wait_for_qrcode_auth" in connectionData:
            component = "wait for qrcode auth";
            break;
        case connectionData && "connected" in connectionData:
            setConnectionUpdate({
                data: {
                    status: "connected",
                    message: "Connected",
                    data: "connected",
                },
                event: "connection.update",
                session_id: `${import.meta.env.VITE_KUFULI_USER_ID}-${
                    getValues().name
                }`,
            });
            break;
        case connectionData && "disconnected" in connectionData:
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
