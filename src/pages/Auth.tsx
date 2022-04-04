import { useState } from "react";
import AuthForm from "../components/AuthForm";

const AuthPage: React.FC = () => {
	const [userData, setUserData] = useState({ clientId: "", clientSecret: "" });
	const [errorMessage, setErrorMessage] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleSubmit = async (clientId: string, clientSecret: string) => {
		setErrorMessage("");

		console.log(clientId, clientSecret);

		var formData = new URLSearchParams();
		formData.append("grant_type", "client_credentials");
		formData.append("client_id", clientId);
		formData.append("client_secret", clientSecret);

		try {
			const response = await fetch("https://video.ibm.com/oauth2/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
				},
				body: formData.toString(),
			});

			const data = await response.json();

			console.log(data);
		} catch (error: any) {
			console.log(error);
			setErrorMessage(error.toString());
		}
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
