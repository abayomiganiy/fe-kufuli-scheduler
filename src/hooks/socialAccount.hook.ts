import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { request } from "../utils/axios-utils";
import { useState } from "react";
import { useAuthContext } from "./auth.hook";
import { EventSource } from "eventsource";

export const useConnectWhatsapp = () => {
    const queryClient = useQueryClient();
    const { token } = useAuthContext();
    const [message, setMessage] = useState<
        | { qr: string }
        | { connection: string; receivedPendingNotifications: boolean }
        | { isNewLogin: boolean }
    >();
    const query = useQuery({
        queryKey: ["connect-whatsapp"],
        queryFn: async () => {
            const event = new EventSource(
                `${import.meta.env.VITE_API_URL}/connect-whatsapp`,
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

export const useGetSocialAccounts = () => {
    const { isLoading } = useAuthContext();
    return useQuery({
        queryKey: ["social-accounts"],
        queryFn: async () => {
            const resp = await request({
                url: "/social-accounts",
                method: "GET",
            });
            return resp;
        },
        enabled: !isLoading,
    });
};

export const useConnectSocialAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["connect-social-accounts"],
        mutationFn: async (data: { name: string; type: "WHATSAPP" }) => {
            const resp = await request({
                url: "/social-accounts",
                method: "POST",
                data,
            });
            return resp;
        },
        onError: (error) => {
            // Handle error
            console.error(error);
        },
        onSuccess: (data) => {
            // Handle success
            console.log("Social account created successfully", data);
            toast.success("Social account created successfully");
            // Update the social accounts query
            queryClient.invalidateQueries({ queryKey: ["social-accounts"] });
        },
    });
};

export const useDeleteSocialAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-social-account"],
        mutationFn: async (data: { id: string; sessionId: string }) => {
            const resp = await request({
                url: `/social-accounts/${data.id}/${data.sessionId}`,
                method: "DELETE",
            });
            return resp;
        },
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
