import "./index.css";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.css";

import App from "./App";

const container = document.getElementById("app");

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
}
