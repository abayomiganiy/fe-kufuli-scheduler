import { IAnalytics } from "../interfaces/analytic.interface";

export const getAnalytics = async (): Promise<IAnalytics[]> => {
    const analytics: IAnalytics[] = [
        {
            name: "Messages schedule",
            used: 25,
            assigned: 500,
        },
        {
            name: "Campaigns",
            used: 1,
            assigned: 5,
        },
        {
            name: "WhatsApp Story Scheduling",
            used: 2,
            assigned: 5,
        },
        {
            name: "Total Views per Story/Message",
            used: 94,
            assigned: +18,
        },
        {
            name: "Average Views per Story",
            used: 25,
            assigned: 500,
        },
        {
            name: "Engagement Rate",
            used: 100,
        },
    ];
    return new Promise<IAnalytics[]>(function (resolve) {
        setTimeout(function () {
            resolve(analytics);
        }, 2000);
    });
};
