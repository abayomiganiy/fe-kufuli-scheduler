import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventSource } from "eventsource";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    connectSocialAccount,
    deleteSocialAccount,
    getSocialAccounts,
} from "../services/socialAccount.service";
import { useAuth } from "./auth.hook";

export const useQRConnectWhatsapp = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();
    const [message, setMessage] = useState<
        | { qr: string }
        | { code: string }
        | { connection: string; receivedPendingNotifications: boolean }
        | { isNewLogin: boolean }
    >();
    const query = useQuery({
        queryKey: ["connect-whatsapp"],
        queryFn: async () => {
            const event = new EventSource(
                `${
                    import.meta.env.VITE_API_URL
                }/social-accounts/connect-whatsapp`,
                {
                    fetch: (input, init) =>
                        fetch(input, {
                            ...init,
                            headers: {
                                ...init!.headers,
                                "Content-Type": "text/event-stream",
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                }
            );
            event.addEventListener("connect-whatsapp", (event) => {
                const eventData = JSON.parse(event.data);
                if (eventData.isNewLogin) {
                    toast.success("New WhatsApp login detected!");
                    queryClient.invalidateQueries({
                        queryKey: ["social-accounts"],
                    });
                }
                setMessage(eventData);
            });
            event.addEventListener("session-id", (e) => console.log(e.data));
        },
        // enabled: false,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
    return { message, query };
};

export const usePhoneConnectWhatsapp = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();
    const [message, setMessage] = useState<
        | { code: string }
        | { connection: string; receivedPendingNotifications: boolean }
        | { isNewLogin: boolean }
    >();
    const mutation = useMutation({
        mutationKey: ["connect-whatsapp"],
        mutationFn: async ({ phoneNumber }: { phoneNumber: string }) => {
            const event = new EventSource(
                `${
                    import.meta.env.VITE_API_URL
                }/social-accounts/connect-whatsapp?phoneNumber=${phoneNumber}`,
                {
                    fetch: (input, init) =>
                        fetch(input, {
                            ...init,
                            headers: {
                                ...init!.headers,
                                "Content-Type": "text/event-stream",
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                }
            );
            event.addEventListener("connect-whatsapp", (event) => {
                const eventData = JSON.parse(event.data);
                if (eventData.isNewLogin) {
                    toast.success("New WhatsApp login detected!");
                    queryClient.invalidateQueries({
                        queryKey: ["social-accounts"],
                    });
                }
                setMessage(eventData);
            });
            event.addEventListener("session-id", (e) => console.log(e.data));
        },
        // enabled: !!phoneNumber,
        // refetchInterval: false,
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
        // refetchOnMount: false,
    });
    return { message, mutation };
};

export const useGetSocialAccounts = () => {
    return useQuery({
        queryKey: ["social-accounts"],
        queryFn: getSocialAccounts,
    });
};

export const useConnectSocialAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["connect-social-accounts"],
        mutationFn: (data: { name: string; type: "WHATSAPP" }) =>
            connectSocialAccount(data),
        onError: (error) => {
            // Handle error
            console.error(error);
        },
        onSuccess: (data) => {
            // Handle success
            console.log("Social account created successfully", data);
            // toast.success("Social account created successfully");
            // Update the social accounts query
            queryClient.invalidateQueries({ queryKey: ["social-accounts"] });
            return data;
        },
    });
};

export const useDeleteSocialAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-social-account"],
        mutationFn: deleteSocialAccount,
        onError: (error) => {
            // Handle error
            console.error(error);
        },
        onSuccess: (data) => {
            // Handle success
            console.log("Social account deleted successfully", data);
            toast.success("Social account deleted successfully");
            // Update the social accounts query
            queryClient.invalidateQueries({ queryKey: ["social-accounts"] });
        },
    });
};
