import { ISocialAccount } from "../interfaces/socialAccount.interface";
// import { request } from "../utils/axios-utils";

export const getContacts = async (currentSocialAccount: ISocialAccount) => {
    if (!currentSocialAccount) {
        throw new Error("Current social account not provided");
    }

    // const resp = await request({
    //     url: `/contacts/${currentSocialAccount?.name}`,
    //     method: "GET",
    // });

    const resp = [
        "2348143641894@s.whatsapp.net",
        "2349071355749@s.whatsapp.net",
        "2348148723402@s.whatsapp.net",
        "2349012702791@s.whatsapp.net",
    ];

    return new Promise<string[]>(function (resolve) {
        setTimeout(function () {
            resolve(resp);
        }, 2000);
    });
};
