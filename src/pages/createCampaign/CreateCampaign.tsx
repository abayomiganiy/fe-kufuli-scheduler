import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Button from "../../components/button";
import CampaignContentPreview from "../../components/campaignContentPreview";
import CampaignPreviewActions from "../../components/campaignPreviewActions";
import Contacts from "../../components/Contacts";
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
import { createCampaignSchema } from "../../schemas/campaign.schema";
import { useCurrentSocialAccount } from "../../store/currentSocialAccountStore";
import { getAccountImageWithType } from "../../utils/getAccountImageWithType";
import SocialAccountsList from "./SocialAccountsList";

const CreateCampaign: React.FC = () => {
    const { currentAccount, setCurrentAccount } = useCurrentSocialAccount();
    const { mutate: createCampaign, isPending: createCampaignIsPending } =
        useCreateCampaign();
    const { data: contacts, isLoading: contactsIsLoading } = useGetContacts({
        currentSocialAccount: currentAccount!,
    });
    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        setValue,
        getValues,
        watch,
    } = useForm<ICampaignFormInput>({
        resolver: zodResolver(createCampaignSchema),
        defaultValues: {
            name: `My Business Campaign ${Date.now()}`,
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
        if (currentAccount) setValue("socialAccountId", currentAccount?.id);
    }, [currentAccount, setValue]);

    const onSubmit = (data: ICampaignFormInput) => {
        const hardCodedData = {
            ...data,
            name: `My Business Campaign ${Date.now()}`,
        };

        createCampaign(hardCodedData);
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
                                            message={message}
                                            setValue={setValue}
                                            getValues={getValues}
                                            index={index}
                                            removeMessage={removeMessage}
                                        />
                                        <CampaignContentPreview
                                            message={message}
                                            register={register}
                                            index={index}
                                            errors={errors}
                                            watch={watch}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center gap-5">
                            {(
                                [
                                    "text",
                                    "image",
                                    "video",
                                    "audio",
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
                        <div className="flex text-center justify-center gap-4 p-2">
                            {errors.messages && (
                                <p className="text-xs text-red-500">
                                    {errors.messages.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="text-lg font-medium mb-2">
                            Social account
                        </label>
                        <SocialAccountsList
                            currentAccount={currentAccount}
                            setCurrentAccount={setCurrentAccount}
                            getAccountImageWithType={getAccountImageWithType}
                            setValue={setValue}
                        />
                        {errors.socialAccountId && (
                            <p className="text-xs text-red-500">
                                {errors.socialAccountId.message}
                            </p>
                        )}
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
                                className="cursor-pointer text-lg font-medium"
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
                                className="cursor-pointer text-lg font-medium"
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
                        <Contacts
                            contacts={contacts ?? []}
                            contactsIsLoading={contactsIsLoading}
                            register={register}
                            setValue={setValue}
                        />
                        {errors.recipients && (
                            <p className="text-xs text-red-500">
                                {errors.recipients.message}
                            </p>
                        )}
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
