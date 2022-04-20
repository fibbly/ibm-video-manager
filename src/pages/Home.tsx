//5@@DxsX-!$@kC-m

import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import { app } from "../constants";
import { GetAccessTokenResponse } from "../types/auth";

const Home = () => {
    const [accessToken, setAccessToken] = useState<string>();
    const [error, setError] = useState<string>();

    const onSubmit = async (clientId: string, clientSecret: string) => {
        const response: GetAccessTokenResponse =
            await app.currentUser?.functions.callFunction(
                "getAccessToken",
                clientId,
                clientSecret
            );

        if (!response.success) {
            console.error(error);
            setError(response.data.error_description);
            return;
        }

        localStorage.setItem("accessToken", response.data.access_token!);
        setAccessToken(response.data!.access_token);
    };

    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken") ?? "");
    }, []);

    return (
        <div className="p-4">
            {accessToken ? (
                <p>Token: {accessToken}</p>
            ) : (
                <div>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <AuthForm onSubmit={onSubmit} />
                </div>
            )}
        </div>
    );
};

export default Home;
