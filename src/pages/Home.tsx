//5@@DxsX-!$@kC-m

import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import { app } from "../constants";

const Home = () => {
    const [accessToken, setAccessToken] = useState<string>();
    const [error, setError] = useState<string>();

    const onSubmit = async (clientId: string, clientSecret: string) => {
        const response = await app.currentUser?.functions.callFunction(
            "getAccessToken",
            clientId,
            clientSecret
        );
        response.success
            ? setAccessToken(response.data!.access_token)
            : setError(response.data.error_description);
    };

    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken") ?? "");
    }, []);

    return (
        <>
            {accessToken ? (
                <p>{accessToken}</p>
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
        </>
    );
};

export default Home;
