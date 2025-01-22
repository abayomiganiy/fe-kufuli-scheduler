import { useDeleteSocialAccount } from "../../hooks/socialAccount.hook";
import { ISocialAccount } from "../../interfaces/socialAccount.interface";
import { getAccountImageWithType } from "../../utils/getAccountImageWithType";
import ClipLoader from "react-spinners/ClipLoader";

export const ConnectedAccounts: React.FC<{
    connectedAccounts: ISocialAccount[];
}> = ({ connectedAccounts }) => {
    return (
        <div className="rounded-2xl flex overflow-auto no-scrollbar py-8 bg-white border-[#E0E0E0] border-[1px]">
            <div className="flex flex-nowrap">
                {connectedAccounts?.map((connectedAccount, index) => (
                    <ConnectedAccount
                        key={index}
                        connectedAccount={connectedAccount}
                    />
                ))}
            </div>
        </div>
    );
};

const ConnectedAccount: React.FC<{
    connectedAccount: ISocialAccount;
}> = ({ connectedAccount }) => {
    const {
        mutate: deleteSocialAccont,
        isPending: deleteSocialAccontIsLoading,
    } = useDeleteSocialAccount();
    return (
        <div className="relative w-20 h-20 mx-3">
            <button
                onClick={() =>
                    deleteSocialAccont({
                        id: connectedAccount.id,
                        sessionId: connectedAccount.name,
                    })
                }
                className={`absolute top-[-10px] right-[-10px] flex justify-center items-center p-1 h-6 w-6 rounded-full ${
                    connectedAccount.status.toLocaleLowerCase() === "active"
                        ? "bg-[#FF3B30]"
                        : connectedAccount.status.toLocaleLowerCase() ===
                          "disconneted"
                        ? "bg-[#ffff00]"
                        : "bg-[#4CD964]"
                } `}
            >
                {deleteSocialAccontIsLoading ? (
                    <ClipLoader size={10} color="#fff" />
                ) : (
                    <svg
                        width="8"
                        height="8"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14 2L8 8M8 8L2 14M8 8L14 14M8 8L2 2"
                            stroke="#ffffff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </button>
            <div className="w-5 h-5 rounded-full bg-[#fff] p-[1px] flex justify-center items-center absolute bottom-0 right-0">
                <img
                    src={connectedAccount.dp}
                    alt={connectedAccount.id}
                    className="object-contain w-full h-full"
                />
            </div>
            <img
                src={getAccountImageWithType(connectedAccount.type)}
                alt={connectedAccount.type as unknown as string}
                className="object-contain w-full h-full"
            />
        </div>
    );
};
