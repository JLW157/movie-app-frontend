import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import AuthContext from "./auth-context";
import { authenticationResponse, userCredentionals } from "./auth-models";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJwt";

const Register = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    async function register(credentials: userCredentionals) {
        try {
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/create`, credentials);

            saveToken(response.data);
            ctx.update(getClaims());
            console.log(response.data);
            navigate("/login");
        } catch (error: any) {
            console.log(error.response.data);
            setErrors(error.response.data);
        }
    }

    return <>
        <h3>Welcome to the site!</h3>
        <h3>Register</h3>
        <DisplayErrors errors={errors} />
        <AuthForm model={{ email: "", password: "" }}
            onSubmit={async (values) => {
                await register(values);
            }} ></AuthForm>
    </>
};

export default Register;