import React from "react";
import { claim } from "./auth-models";

const AuthContext = React.createContext<AuthContextType>({
    claims: [],
    update: () => { },
    isLogginedIn: false
});


interface AuthContextType {
    isLogginedIn?: boolean,
    claims: claim[];
    update(claims: claim[]): void;
}

export default AuthContext;