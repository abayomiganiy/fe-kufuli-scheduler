import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import GridLoader from "react-spinners/GridLoader";
import { z } from "zod";
import {
    useConnectSocialAccount,
    useGetSocialAccounts,
} from "../../hooks/socialAccount.hook";
import { useWhatsappSocket } from "../../hooks/whatsappSocket.hook";
import Button from "../button";
import { connectionType } from "./WhatsappConnectionFlow";

export interface IConnectionData {
    name: string;
    type: "WHATSAPP";
    phoneNumber?: string;
}

const connectionValidationSchema = z.object({
    name: z
        .string()
        .min(3, "Name must contain at least 3 characters")
        .max(20, "Name must contain at most 20 characters")
        .refine((val) => /^[^\s-]+$/.test(val), {
            message: "Name cannot contain spaces or hyphens",
        }),
    type: z.literal("WHATSAPP"),
    phoneNumber: z.string().optional(),
});

const Connection: React.FC<{
    connection: connectionType;
    onClose: () => void;
    setConnection: (
        connectionType: React.SetStateAction<connectionType>
    ) => void;
}> = ({ connection, onClose, setConnection }) => {
    const {
        mutate: connect,
        data: connectionData,
        isPending: connectionIsPending,
    } = useConnectSocialAccount();

    console.log(`connectionData: ${JSON.stringify(connectionData)}`);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        reset,
    } = useForm<IConnectionData>({
        resolver: zodResolver(connectionValidationSchema),
        defaultValues: { name: "", type: "WHATSAPP" },
    });
    const name = watch("name");

    const { refetch: refetchSocialAccounts } = useGetSocialAccounts();
    const { initializeSocket, connectionEvent } = useWhatsappSocket({
        onClose,
        name,
    });

    const onSubmit = (data: IConnectionData) => {
        console.log(data);
        initializeSocket();
        connect(data);
    };

    if (connectionIsPending) {
        return <GridLoader size={30} color="#3BA0BF" />;
    }

    const renderContent = () => {
        if (connectionEvent === "pulling_wa_data") return "Pulling data";
        if (connectionEvent === "connected") {
            refetchSocialAccounts();
            onClose();
            return "connected";
        }
        if (!connectionData && connection === "QR Code") {
            return (
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
                        onClick={() => {
                            reset();
                            setConnection("Phone Number");
                        }}
                        className="font-semibold text-xs laptop:text-base"
                    >
                        Use phone number instead
                    </button>
                </form>
            );
        }
        if (!connectionData && connection === "Phone Number") {
            return (
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
                    <PhoneInputWithCountry
                        className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg [&:has(*:focus)]:border-[#4CCEF7] [&_*:focus]:outline-none"
                        name="phoneNumber"
                        placeholder="Enter Whatsapp Number"
                        control={control}
                        rules={{ required: true }}
                        autoComplete="on"
                        countryCallingCodeEditable={false}
                    />
                    {errors.phoneNumber && (
                        <p className="text-xs text-red-500">
                            {errors.phoneNumber.message}
                        </p>
                    )}
                    <Button className="w-full" disabled={connectionIsPending}>
                        {connectionIsPending ? "Loading..." : "Connect"}
                    </Button>
                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            setConnection("QR Code");
                        }}
                        className="font-semibold text-xs laptop:text-base"
                    >
                        Use QR Code instead
                    </button>
                </form>
            );
        }

        if (connectionData && "code" in connectionData) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <h3 className="font-semibold text-xs laptop:text-sm">
                        Enter this code to connect with WhatsApp
                    </h3>
                    <div className="flex justify-center items-center gap-2 sm:gap-4 p-4 sm:p-6">
                        {connectionData?.code &&
                            connectionData?.code
                                ?.split("")
                                ?.map(
                                    (
                                        char: string,
                                        index: number,
                                        array: []
                                    ) => (
                                        <>
                                            {index === array.length / 2 && (
                                                <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold p-2">
                                                    -
                                                </span>
                                            )}
                                            <span
                                                key={index}
                                                className="inline-flex justify-center items-center
                                        text-lg sm:text-2xl md:text-3xl lg:text-4xl
                                        font-bold bg-gray-100 rounded-lg
                                        w-8 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16
                                        transition-all duration-200 hover:bg-gray-200"
                                            >
                                                {char}
                                            </span>
                                        </>
                                    )
                                )}
                    </div>
                </div>
            );
        }

        if (connectionData && "qr" in connectionData) {
            return (
                <img
                    src={connectionData.qr}
                    alt="WhatsApp QR Code"
                    className="h-[200px] w-[200px]"
                />
            );
        }

        return null;
    };

    return (
        <div className="w-full flex justify-center items-center">
            {renderContent()}
        </div>
    );
};

export default Connection;
