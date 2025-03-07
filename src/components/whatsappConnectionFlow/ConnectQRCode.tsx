import GridLoader from "react-spinners/GridLoader";
import { useConnectSocialAccount } from "../../hooks/socialAccount.hook";
import { connectionType } from "./WhatsappConnectionFlow";
import Button from "../button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IConnectionData {
    name: string;
    type: "WHATSAPP";
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
}> = ({
    // onClose,
    setConnection,
}) => {
    const {
        mutate: connect,
        data: connectionData,
        isPending: connectionIsPending,
    } = useConnectSocialAccount();

    const {
        register,
        handleSubmit,
        // getValues,
        formState: { errors },
    } = useForm<IConnectionData>({
        resolver: zodResolver(connectionValidationSchema),
        defaultValues: {
            name: "",
            type: "WHATSAPP",
        },
    });

    const onSubmit = (data: { name: string; type: "WHATSAPP" }) => {
        console.log(data);
        connect(data);
    };

    if (connectionIsPending) {
        return <GridLoader size={30} color="#3BA0BF" />;
    }

    if (!connectionIsPending) {
        console.log("connectionData: ", connectionData);
    }

    let component;
    switch (true) {
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
                            <button
                                type="button"
                                onClick={() => setConnection("Phone Number")}
                                className="font-semibold text-xs laptop:text-base"
                            >
                                Use phone number instead
                            </button>
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
