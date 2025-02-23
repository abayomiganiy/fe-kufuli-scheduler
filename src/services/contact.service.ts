// import { IContact } from "../interfaces/contact.interface";
import { ISocialAccount } from "../interfaces/socialAccount.interface";
import { request } from "../utils/axios-utils";

export const getContacts = async (currentSocialAccount: ISocialAccount) => {
    if (!currentSocialAccount) {
        throw new Error("Current social account not provided");
    }

    const resp = [
        ...[
            {
                id: "2348143641894@s.whatsapp.net",
                name: "Emily",
                pkId: "1234567890",
            },
            {
                id: "2349071355749@s.whatsapp.net",
                name: "Emily 2",
                pkId: "1234567891",
            },
            {
                id: "2348148723402@s.whatsapp.net",
                name: "Lakers",
                pkId: "1234567892",
            },
            {
                id: "2349012702791@s.whatsapp.net",
                name: "Adeleke",
                pkId: "1234567893",
            },
        ],
        ...(await request({
            url: `/contacts/${currentSocialAccount?.name}`,
            method: "GET",
        })),
    ];

    console.log(resp);

    return resp;

    // return new Promise<IContact[]>(function (resolve) {
    //     setTimeout(function () {
    //         resolve(resp);
    //     }, 2000);
    // });
};
