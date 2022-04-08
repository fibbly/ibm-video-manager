import { useRef } from "react";

interface AuthFormProps {
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onError: (errorMessage: string) => void;
}

const AuthForm = ({
    onSubmit,
    onChange,
    onError,
}: AuthFormProps): JSX.Element => {
    const clientIdRef = useRef<HTMLInputElement>(null);
    const clientSecretRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const clientId = clientIdRef.current?.value || null;
        const clientSecret = clientSecretRef.current?.value || null;

        if (clientId && clientSecret) {
            onSubmit();
        } else {
            onError("Please enter a valid client id and secret.");
        }
    };

    return (
        <div className="h-full flex items-center justify-center p-12">
            <form className="flex flex-col gap-5" onSubmit={submitHandler}>
                <input
                    type="text"
                    ref={clientIdRef}
                    placeholder="Client ID"
                    onChange={onChange}
                    required
                    className="bg-slate-200 p-2 rounded"
                />
                <input
                    type="text"
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
