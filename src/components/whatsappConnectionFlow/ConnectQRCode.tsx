import GridLoader from "react-spinners/GridLoader";
import { useQRConnectWhatsapp } from "../../hooks/socialAccount.hook";
import { connectionType } from "./WhatsappConnectionFlow";

const ConnectQRCode: React.FC<{
    onClose: () => void;
    setConnection: (
        connectionType: React.SetStateAction<connectionType>
    ) => void;
}> = ({ onClose, setConnection }) => {
    const { message } = useQRConnectWhatsapp();
    let component;
    if (message && (message as { qr: string })?.qr) {
        component = (
            <div>
                <img
                    src={(message as { qr: string })?.qr}
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
        );
    } else if (
        !message ||
        (message &&
            (message as { connection: string })?.connection === "connecting")
    ) {
        component = <GridLoader size={30} color="#3BA0BF" />;
    } else if (
        (message as { connection: string })?.connection === "close" ||
        (message as { isNewLogin: boolean })?.isNewLogin === true
    ) {
        onClose();
    }
    return (
        <div className="w-full laptop:w-[612px] flex flex-col justify-center items-center gap-4">
            <div className="w-full flex justify-center items-center">
                {component}
            </div>
        </div>
    );
};

export default ConnectQRCode;
