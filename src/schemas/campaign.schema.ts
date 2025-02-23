import * as z from "zod";

export const textMessageSchema = z.object({
    type: z.literal("text"),
    message: z.object({
        text: z.string().min(1, "Text cannot be empty"),
    }),
    options: z.object({
        font: z.number().optional(),
        backgroundColor: z.string().optional(),
    }),
});

export const imageMessageSchema = z.object({
    type: z.literal("image"),
    message: z.object({
        image: z.object({
            url: z.string(),
        }),
        caption: z.string().optional(),
    }),
});

export const videoMessageSchema = z.object({
    type: z.literal("video"),
    message: z.object({
        video: z.object({
            url: z.string(),
        }),
        caption: z.string().optional(),
    }),
});

export const audeoMessageSchema = z.object({
    type: z.literal("audio"),
    message: z.object({
        audio: z.object({
            url: z.string(),
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
        messages: messagesSchema,
        isEighteenPlus: z.boolean().refine((val) => val !== undefined, {
            message: "Please select an option.",
        }),
        frequency: z
            .enum(["ONCE", "DAILY", "WEEKLY", "MONTHLY", "YEARLY", "CUSTOM"])
            .refine((val) => val !== undefined, {
                message: "Please select a frequency.",
            }),
        scheduledTime: z.string().pipe(z.coerce.date()),
        recipients: z.array(z.string()),
    })
    .required();
