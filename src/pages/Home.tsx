//5@@DxsX-!$@kC-m

import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import { app } from "../constants";
import { GetAccessTokenResponse } from "../types/auth";

const Home = () => {
    const [accessToken, setAccessToken] = useState<string>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [expiresIn, setExpiresIn] = useState<string>();
    const [expiresInFormatted, setExpiresInFormatted] = useState<string>();
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

        const accessToken = response.data.access_token!;
        const now = new Date();
        const expiresIn = Math.floor(
            new Date(
                now.getTime() + Number(response.data.expires_in) * 1000
            ).getTime() / 1000
        ).toString();
        const expiresInFormatted = new Date(
            Number(expiresIn) * 1000
        ).toLocaleString();

        setAccessToken(accessToken);
        setExpiresIn(expiresIn);
        setExpiresInFormatted(expiresInFormatted);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("expiresIn", expiresIn);
    };

    const logout = () => {
        setAccessToken("");
        setExpiresIn("");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresIn");
    };

    useEffect(() => {
        const tkn = localStorage.getItem("accessToken");
        const exp = localStorage.getItem("expiresIn");

        if (
            !tkn ||
            !exp ||
            tkn === "undefined" ||
            exp === "undefined" ||
            tkn === "" ||
            exp === ""
        ) {
            console.error("Invalid token");
            logout();
            return;
        }

        const isExpired = Date.now() >= Number(exp) * 1000;
        const expiresInFormatted = new Date(
            Number(exp) * 1000
        ).toLocaleString();

        if (isExpired) {
            console.error(`Token expired on ${expiresInFormatted}`, {
                now: Date.now(),
                expiresIn: Number(exp) * 1000,
            });
            logout();
            return;
        }

        setAccessToken(tkn);
        setExpiresIn(exp);
        setExpiresInFormatted(expiresInFormatted);
    }, []);

    return (
        <div className="p-4">
            {accessToken ? (
                <div className="d-flex justify-content-between">
                    <div>
                        <p>Token: {accessToken}</p>
                        <p>Expires: {expiresInFormatted}</p>
                    </div>
                    <button onClick={logout} className="btn btn-primary h-50">
                        Logout
                    </button>
                </div>
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
