import { useRef } from "react";

interface AuthFormProps {
    onSubmit: (clientId: string, clientSecret: string) => Promise<void>;
}

const AuthForm = ({ onSubmit }: AuthFormProps): JSX.Element => {
    const clientIdRef = useRef<HTMLInputElement>(null);
    const clientSecretRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const clientId = clientIdRef.current?.value || null;
        const clientSecret = clientSecretRef.current?.value || null;

        if (clientId && clientSecret) {
            onSubmit(clientId, clientSecret);
        }
    };

    return (
        <div className="h-full flex items-center justify-center p-12">
            <form className="flex flex-col gap-5" onSubmit={submitHandler}>
                <input
                    type="text"
                    ref={clientIdRef}
                    placeholder="Client ID"
                    required
                    className="bg-slate-200 p-2 rounded"
                />
                <input
                    type="password"
                    ref={clientSecretRef}
                    placeholder="Client Secret"
                    required
                    className="bg-slate-200 p-2 rounded"
                />
                <button
                    className="bg-blue-500 text-white rounded-md py-2"
                    type="submit"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
