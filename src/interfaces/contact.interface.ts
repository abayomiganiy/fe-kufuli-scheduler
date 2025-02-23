export interface IContact {
    pkId: number;
    sessionId: string;
    id: string;
    name: string;
    notify: string | null;
    verifiedName: string | null;
    imgUrl: string | null;
    status: string | null;
}