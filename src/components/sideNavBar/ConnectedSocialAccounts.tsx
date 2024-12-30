import { Link } from "react-router-dom";
import { useGetSocialAccounts } from "../../hooks/socialAccount.hook";
import { ISocialAccount } from "../../interfaces/socialAccount.interface";
import { useCurrentSocialAccount } from "../../store/currentSocialAccountStore";
import { getAccountImageWithType } from "../../utils/getAccountImageWithType";

const ConnectedSocialAccounts = () => {
    const { data: connectedAccounts } = useGetSocialAccounts();
    const currentSocialAccount = useCurrentSocialAccount(
        (state) => state.currentAccount
    );
    const setCurrentSocialAccount = useCurrentSocialAccount(
        (state) => state.setCurrentAccount
    );

    return (
        <div className="flex flex-col w-full p-2 gap-2 border-gray-400 border-2 rounded-2xl shadow-xl">
            {connectedAccounts?.map((account: ISocialAccount) => (
                <button
                    className="flex justify-between items-center gap-2"
                    onClick={() => setCurrentSocialAccount(account)}
                >
                    <div className="flex justify-between items-center gap-2">
                        <div className="relative h-8 w-8">
                            <img
                                src={getAccountImageWithType(account.type)}
                                alt={account.name}
                                className="h-8 w-8"
                            />
                            <img
                                src={account.dp}
                                alt={account.id}
                                className="object-contain w-3 h-3 rounded-full absolute right-0 bottom-0"
                            />
                        </div>
                        <div>{account.name}</div>
                    </div>
                    {account.id === currentSocialAccount?.id && (
                        <div className="rounded-full bg-green-400 p-1">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 14 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.5 6.65625L4.78125 9.9375L12 2.0625"
                                    stroke="#fff"
                                    stroke-width="2.625"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    )}
                </button>
            ))}
            <Link to="/connect-account">Connect Account</Link>
        </div>
    );
};

export default ConnectedSocialAccounts;
