import React from "react";
import { queryClient } from "../../main";
import {
    ConnectionNameTypes,
    ISocialAccount,
} from "../../interfaces/socialAccount.interface";
import { Link } from "react-router-dom";
import { UseFormSetValue } from "react-hook-form";
import { ICampaignFormInput } from "../../interfaces/campaign.interface";
import { useGetSocialAccounts } from "../../hooks/socialAccount.hook";

// Props interface for component
interface SocialAccountsListProps {
    currentAccount: ISocialAccount | null;
    setCurrentAccount: (account: ISocialAccount) => void;
    getAccountImageWithType: (type: ConnectionNameTypes) => string;
    setValue: UseFormSetValue<ICampaignFormInput>;
}

const SocialAccountsList: React.FC<SocialAccountsListProps> = ({
    currentAccount,
    setCurrentAccount,
    getAccountImageWithType,
    setValue,
}) => {
    const { data: socialAccounts, isLoading: isLoadingSocialAccount } =
        useGetSocialAccounts();
    if (isLoadingSocialAccount) {
        return (
            <div className="p-4 text-gray-500">Loading social accounts...</div>
        );
    }
    // Early return for no accounts
    if (!socialAccounts || socialAccounts.length === 0) {
        return (
            <div className="p-4 text-gray-500">
                No social accounts available.{" "}
                <Link className="text-blue-500" to={"/connect-account"}>
                    Add social account
                </Link>
            </div>
        );
    }

    const handleAccountSelect = (account: ISocialAccount) => {
        if (account.id === currentAccount?.id) return;
        setCurrentAccount(account);
        setValue("socialAccountId", account.id);
        queryClient.clear();
    };

    const formatAccountName = (name: string) => {
        if (name.length <= 10) return name;
        return `${name.slice(0, 4)}...${name.slice(-4)}`;
    };

    return (
        <div className="flex gap-4 p-4 overflow-x-scroll">
            {socialAccounts.map((account: ISocialAccount) => {
                const isSelected = account.id === currentAccount?.id;
                const formattedName = formatAccountName(account.name);

                return (
                    <div
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer ${
                            isSelected
                                ? "bg-gray-100 dark:bg-gray-800"
                                : "hover:bg-gray-50 dark:hover:bg-gray-900"
                        }`}
                        key={account.id}
                        onClick={() => handleAccountSelect(account)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleAccountSelect(account);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                    >
                        <div className="relative">
                            <img
                                src={getAccountImageWithType(account.type)}
                                alt={`${account.name} account icon`}
                                className="h-10 w-10 rounded-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        "/default-account-icon.png";
                                }}
                            />

                            {isSelected && (
                                <div
                                    className="absolute -right-1 -top-1 rounded-full bg-green-500 p-1 shadow-sm"
                                    aria-hidden="true"
                                >
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
                                            strokeWidth="2.625"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div
                            className="text-sm font-medium"
                            title={account.name}
                        >
                            {formattedName}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SocialAccountsList;
