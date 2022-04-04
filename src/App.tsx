import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
	const accessToken = localStorage.getItem("accessToken");

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/auth" element={<AuthPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	);
}

export default App;
