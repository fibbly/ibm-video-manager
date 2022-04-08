import * as Realm from "realm-web";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext({});

const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID || "" });

const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<Realm.User>();

    useEffect(() => {
        async function login() {
            const user = await app.logIn(Realm.Credentials.anonymous());
            setCurrentUser(user);
        }
        login();
    }, []);

    const value = {
        currentUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
