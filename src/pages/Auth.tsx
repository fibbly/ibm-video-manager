import { useState } from "react";
import * as Realm from "realm-web";

import AuthForm from "../components/AuthForm";
import AuthResponse from "../types/AuthResponse";

const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID || "" });

const AuthPage: React.FC = () => {
    //const [user, setUser] = useState<Realm.User>();
    const [userData, setUserData] = useState({
        clientId: "",
        clientSecret: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const loginAnonymous = async () => {
        const user: Realm.User = await app.logIn(Realm.Credentials.anonymous());
        return user;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    //5@@DxsX-!$@kC-m

    const handleSubmit = async () => {
        setErrorMessage("");

        const user = await loginAnonymous();

        if (user) {
            try {
                const result: AuthResponse =
                    await user.functions.getAccessToken("a", "b");
                if (!result.success) {
                    setErrorMessage(
                        result.message || "Request failed for an unknown reason"
                    );
                    return;
                }
                console.log(result);
                localStorage.setItem("session", JSON.stringify(result.data));
            } catch (error: any) {
                setErrorMessage(error.message);
            }
        } else {
            setErrorMessage("Unable to access Realm functions");
        }

        // var formData = new URLSearchParams();
        // formData.append("grant_type", "client_credentials");
        // formData.append("client_id", clientId);
        // formData.append("client_secret", clientSecret);

        // try {
        //     const response = await fetch("https://video.ibm.com/oauth2/token", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type":
        //                 "application/x-www-form-urlencoded;charset=UTF-8",
        //         },
        //         body: formData.toString(),
        //     });

        //     const data = await response.json();

        //     console.log(data);
        // } catch (error: any) {
        //     console.log(error);
        //     setErrorMessage(error.toString());
        // }
    };

    const handleError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
    };

    return (
        <div>
            {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <AuthForm
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                onError={handleError}
            />
        </div>
    );
};

export default AuthPage;
