import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GridLoader from "react-spinners/GridLoader";
import * as z from "zod";
import { usePhoneConnectWhatsapp } from "../../hooks/socialAccount.hook";
import Button from "../button";
import { connectionType } from "./WhatsappConnectionFlow";

interface IPhoneNumber {
    phoneNumber: string;
}

const phoneValidationSchema = z
    .object({
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
        getValues,
        formState: { errors },
    } = useForm<IPhoneNumber>({
        resolver: zodResolver(phoneValidationSchema),
    });
    const { message, mutation } = usePhoneConnectWhatsapp();
    const { mutate, isPending } = mutation;
    const onSubmit = () => {
        mutate(getValues());
    };
    let component;
    if (message && (message as { code: string })?.code) {
        component = <div>{(message as { code: string })?.code}</div>;
    } else if (
        (message &&
            (message as { connection: string })?.connection === "connecting") ||
        isPending
    ) {
        component = <GridLoader size={30} color="#3BA0BF" />;
    } else if (
        (message as { connection: string })?.connection === "close" ||
        (message as { isNewLogin: boolean })?.isNewLogin === true
    ) {
        onClose();
    } else {
        component = (
            <form
                className="w-full flex flex-col items-center gap-6"
                onSubmit={handleSubmit(onSubmit)}
            >
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
                <Button className="w-full" disabled={isPending}>
                    {isPending ? "Loading..." : "Connect"}
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
        <div className="w-full laptop:w-[612px] flex flex-col justify-center items-center gap-4">
            <div className="w-full flex justify-center items-center">
                {component}
            </div>
        </div>
    );
};

export default PhoneNumber;
