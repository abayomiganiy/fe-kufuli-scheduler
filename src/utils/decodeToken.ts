import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    userId: string;
    iat: number;
    exp: number;
}

export const useDecodeToken = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken: DecodedToken = jwtDecode(token);
            if (decodedToken.exp! * 1000 < Date.now()) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    }, [navigate]);
};