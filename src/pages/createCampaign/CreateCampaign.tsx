import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Button from "../../components/button";
import CampaignContentPreview from "../../components/campaignContentPreview";
import CampaignPreviewActions from "../../components/campaignPreviewActions";
import ContentTypeIcon from "../../components/contentTypeIcon";
import BackIcon from "../../components/icons/backIcon";
import RadioGroup from "../../components/radioGroup/RadioGroup";
import SectionHeader from "../../components/sectionHeader";
import { useCreateCampaign } from "../../hooks/campaign.hook";
import { useGetContacts } from "../../hooks/contact.hook";
import {
    CampaignContentType,
    ICampaignFormInput,
} from "../../interfaces/campaign.interface";
import { useCurrentSocialAccount } from "../../store/currentSocialAccountStore";
import { IContact } from "../../interfaces/contact.interface";
import { createCampaignSchema } from "../../schemas/campaign.schema";

const CreateCampaign: React.FC = () => {
    const [allContact, setallContact] = useState(false);
    const { currentAccount } = useCurrentSocialAccount();
    const {
        mutate: createCampaign,
        isPending: createCampaignIsPending,
        isSuccess: createCampaignIsSuccess,
    } = useCreateCampaign();
    const { data: contacts, isLoading: contactsIsLoading } = useGetContacts();
    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        setValue,
        getValues,
        reset,
    } = useForm<ICampaignFormInput>({
        resolver: zodResolver(createCampaignSchema),
        defaultValues: {
            socialAccountId: currentAccount?.id,
            name: `My Business Campaign ${Date.now()}`,
            isEighteenPlus: false,
            scheduledTime: new Date(),
            messages: [],
            recipients: [],
        },
    });

    const {
        fields: messages,
        append: appendMessage,
        remove: removeMessage,
    } = useFieldArray({
        name: "messages",
        control,
    });

    console.log(errors);
    // console.log(`getValues: ${JSON.stringify(getValues())}`);
    // console.log(`messages: ${JSON.stringify(messages)}`);

    useEffect(() => {
        reset();
        setallContact(false);
    }, [createCampaignIsSuccess, reset]);

    const onSubmit = (data: ICampaignFormInput) => {
        const hardCodedData = {
            ...data,
            name: `My Business Campaign ${Date.now()}`,
        };

        createCampaign(hardCodedData);
    };

    const handleSelectAllContacts = () => {
        if (!allContact) {
            const allContactIds = contacts?.map((contact) => contact.id) || [];
            setValue("recipients", allContactIds);
            setallContact(true);
        } else {
            setValue("recipients", []);
            setallContact(false);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-3">
                <BackIcon />
                <SectionHeader title="Create Campaign" />
            </div>
            <div className="flex flex-col gap-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 pb-5"
                    encType="multipart/form-data"
                >
                    <div className="flex overflow-x-auto pb-5">
                        <div className="flex justify-center gap-4 flex-nowrap">
                            {messages.map((message, index) => {
                                return (
                                    <div
                                        className="flex flex-col gap-3 relative"
                                        key={message?.id}
                                    >
                                        <CampaignPreviewActions
                                            content={message}
                                            setValue={setValue}
                                            index={index}
                                            removeMessage={removeMessage}
                                        />
                                        <CampaignContentPreview
                                            content={message}
                                            getValues={getValues}
                                            register={register}
                                            index={index}
                                            errors={errors}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex justify-center gap-5">
                        {(
                            [
                                "text",
                                "image",
                                "video",
                                // "audio",
                            ] as CampaignContentType[]
                        ).map((type, index) => (
                            <div key={index}>
                                <ContentTypeIcon
                                    key={index}
                                    type={type}
                                    appendMessage={appendMessage}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex items-center gap-4 p-2">
                            <input
                                type="checkbox"
                                {...register("isEighteenPlus")}
                                className="ml-2"
                                id="isEighteenPlus"
                            />
                            <label
                                htmlFor={`isEighteenPlus`}
                                className="cursor-pointer"
                            >
                                Is this rated 18+
                            </label>

                            {errors.isEighteenPlus && (
                                <p className="text-xs text-red-500">
                                    {errors.isEighteenPlus.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Controller
                            name="frequency"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    title="Frequency"
                                    options={[
                                        { label: "Once", value: "ONCE" },
                                        { label: "Daily", value: "DAILY" },
                                        { label: "Weekly", value: "WEEKLY" },
                                        { label: "Monthly", value: "MONTHLY" },
                                        { label: "Yearly", value: "YEARLY" },
                                        { label: "Custom", value: "custom" },
                                    ]}
                                />
                            )}
                        />
                        {errors.frequency && (
                            <p className="text-xs text-red-500">
                                {errors.frequency.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="flex flex-col gap-4 p-2">
                            <label
                                htmlFor={`scheduledTime`}
                                className="cursor-pointer"
                            >
                                Schedule
                            </label>
                            <input
                                type="datetime-local"
                                {...register("scheduledTime")}
                                className="ml-2"
                                id="scheduledTime"
                            />
                            {errors.scheduledTime && (
                                <p className="text-xs text-red-500">
                                    {errors.scheduledTime.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col gap-4 p-2">
                            <label className="cursor-pointer">Recipients</label>
                            {contactsIsLoading ? (
                                <p>Loading contacts...</p>
                            ) : (
                                <>
                                    {!contacts?.length ? (
                                        <p>No contacts available</p>
                                    ) : (
                                        <div className="flex flex-col gap-2 ml-2 h-[200px] overflow-y-auto">
                                            <label className="flex items-center gap-2 cursor-pointer border-b pb-2">
                                                <input
                                                    type="checkbox"
                                                    onChange={
                                                        handleSelectAllContacts
                                                    }
                                                    className="cursor-pointer h-5 w-5 rounded-full"
                                                    checked={allContact}
                                                />
                                                Select All Contacts
                                            </label>
                                            {contacts
                                                ?.sort(
                                                    (
                                                        a: IContact,
                                                        b: IContact
                                                    ) =>
                                                        a.name?.localeCompare(
                                                            b.name
                                                        )
                                                )
                                                .map((recipient: IContact) => (
                                                    <label
                                                        key={recipient.pkId}
                                                        className="flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={
                                                                recipient?.id
                                                            }
                                                            {...register(
                                                                "recipients"
                                                            )}
                                                            className="cursor-pointer h-5 w-5 rounded-full"
                                                        />
                                                        {recipient.name
                                                            ? recipient.name
                                                            : recipient.notify}
                                                    </label>
                                                ))}
                                        </div>
                                    )}
                                </>
                            )}
                            {errors.recipients && (
                                <p className="text-xs text-red-500">
                                    {errors.recipients.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <Button type="submit" disabled={createCampaignIsPending}>
                        {createCampaignIsPending
                            ? "Creating Campaign..."
                            : "Continue"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaign;
