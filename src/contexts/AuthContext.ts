import React from "react";

const AuthContext = React.createContext<{
    token: string | null;
    isLoading: boolean;
}>({
    token: null,
    isLoading: true,
});

export default AuthContext;
