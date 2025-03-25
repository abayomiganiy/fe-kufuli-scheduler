import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import GridLoader from "react-spinners/GridLoader";
import * as z from "zod";
import { useConnectSocialAccount } from "../../hooks/socialAccount.hook";
import { useWhatsappSocket } from "../../hooks/whatsappSocket.hook";
import { socket } from "../../socket";
import Button from "../button";
import { connectionType } from "./WhatsappConnectionFlow";

export interface IPhoneNumberData {
    name: string;
    type: "WHATSAPP";
    phoneNumber?: string;
}

const phoneValidationSchema = z
    .object({
        name: z.string().max(10).min(3),
        type: z.string(),
        phoneNumber: z.string(),
    })
    .required();

const PhoneNumber: React.FC<{
    onClose: () => void;
    setConnection: (
        connectionType: React.SetStateAction<connectionType>
    ) => void;
}> = ({ onClose, setConnection }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues,
    } = useForm<IPhoneNumberData>({
        resolver: zodResolver(phoneValidationSchema),
        defaultValues: {
            name: "",
            type: "WHATSAPP",
            phoneNumber: "",
        },
    });
    const {
        mutate: connect,
        data: connectionData,
        isPending: connectionIsPending,
    } = useConnectSocialAccount();

    const { socketRef, setConnectionUpdate } = useWhatsappSocket({
        onClose,
        getValues,
    });

    const onSubmit = (data: IPhoneNumberData) => {
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
        case connectionData && "code" in connectionData:
            component = (
                <div className="flex flex-col items-center gap-4">
                    <h3 className="font-semibold text-xs laptop:text-sm">
                        Enter this code to connect with WhatsApp
                    </h3>
                    <div className="flex justify-center items-center gap-2 sm:gap-4 p-4 sm:p-6">
                        {(connectionData as { code: string })?.code?.split("")
                            .map((char, index, array) => (
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
                            ))}
                    </div>
                </div>
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
                        onClick={() => setConnection("QR Code")}
                        className="font-semibold text-xs laptop:text-base"
                    >
                        Use QR Code instead
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

export default PhoneNumber;
