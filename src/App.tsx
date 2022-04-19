import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { app } from "./constants";

function App() {
    useEffect(() => {
        if (!app.currentUser?.isLoggedIn) {
            const credentials = Realm.Credentials.anonymous();
            try {
                app.logIn(credentials).then((user) => console.log(user));
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
