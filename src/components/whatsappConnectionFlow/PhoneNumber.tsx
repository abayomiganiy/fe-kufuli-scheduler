import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GridLoader from "react-spinners/GridLoader";
import * as z from "zod";
import { useConnectSocialAccount } from "../../hooks/socialAccount.hook";
import Button from "../button";
import { connectionType } from "./WhatsappConnectionFlow";

interface IPhoneNumber {
    name: string;
    type: "WHATSAPP";
    phoneNumber: string;
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
    } = useForm<IPhoneNumber>({
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
    const onSubmit = (data: IPhoneNumber) => {
        connect(data);
    };

    let component;
    if (connectionData && (connectionData as { code: string })?.code) {
        component = <div>{(connectionData as { code: string })?.code}</div>;
    } else if (
        (connectionData &&
            (connectionData as { connection: string })?.connection ===
                "connecting") ||
        connectionIsPending
    ) {
        component = <GridLoader size={30} color="#3BA0BF" />;
    } else if (
        (connectionData as { connection: string })?.connection === "close" ||
        (connectionData as { isNewLogin: boolean })?.isNewLogin === true
    ) {
        onClose();
    } else {
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
                <input
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="Enter Whatsapp Number"
                    className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg focus:outline-none focus:border-[#4CCEF7]"
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
    }

    return (
        <div className="w-full flex justify-center items-center">
            {component}
        </div>
    );
};

export default PhoneNumber;
