import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    userId: string;
    iat: number;
    exp: number;
}

export const verifyToken = (token: string) => {
    if (token) {
        const decodedToken: DecodedToken = jwtDecode(token);
        if (decodedToken.exp! * 1000 < Date.now()) {
            return false;
        }
        return true;
    } else {
        return false;
    }
};
