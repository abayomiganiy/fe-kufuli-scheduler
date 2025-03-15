import * as z from "zod";
import { FrequencyEnum } from "../interfaces/campaign.interface";

export const textMessageSchema = z.object({
    type: z.literal("text"),
    content: z.object({
        text: z.string().min(1, "Text cannot be empty"),
    }),
    options: z.object({
        font: z.number().optional(),
        backgroundColor: z.string().optional(),
    }),
});

export const imageMessageSchema = z.object({
    type: z.literal("image"),
    content: z.object({
        image: z.object({
            url: z
                .instanceof(File)
                .refine(
                    (file) =>
                        [
                            "image/png",
                            "image/jpeg",
                            "image/jpg",
                            "image/svg+xml",
                            "image/gif",
                        ].includes(file.type),
                    { message: "Invalid image file type" }
                )
                .refine((file) => file.size <= 100 * 1024 * 1024, {
                    message: "File size should not exceed 5MB",
                }),
        }),
        caption: z.string().optional(),
    }),
});

export const videoMessageSchema = z.object({
    type: z.literal("video"),
    content: z.object({
        video: z.object({
            url: z
                .instanceof(File)
                .refine(
                    (file) =>
                        ["video/mp4", "video/quicktime", "video/mpeg"].includes(
                            file.type
                        ),
                    { message: "Invalid video file type" }
                ),
        }),
        caption: z.string().optional(),
    }),
});

export const audeoMessageSchema = z.object({
    type: z.literal("audio"),
    content: z.object({
        audio: z.object({
            url: z
                .instanceof(File)
                .refine(
                    (file) =>
                        [
                            "audio/mpeg",
                            "audio/mp3",
                            "audio/ogg",
                            "audio/wav",
                        ].includes(file.type),
                    { message: "Invalid audio file type" }
                ),
        }),
    }),
    options: z.object({
        backgroundColor: z.string().optional(),
    }),
});

export const messagesSchema = z.array(
    z.discriminatedUnion("type", [
        textMessageSchema,
        imageMessageSchema,
        videoMessageSchema,
        audeoMessageSchema,
    ])
);

export const createCampaignSchema = z
    .object({
        // name: z.string().min(5, ""),
        socialAccountId: z.string(),
        messages: messagesSchema,
        isEighteenPlus: z.boolean().refine((val) => val !== undefined, {
            message: "Please select an option.",
        }),
        frequency: z
            .enum(Object.values(FrequencyEnum) as [string, ...string[]])
            .refine((val) => val !== undefined, {
                message: "Please select a frequency.",
            }),
        scheduledTime: z.string().pipe(z.coerce.date()),
        recipients: z.array(z.string()),
    })
    .required();
