export default interface AuthResponse {
    success: boolean;
    data?: {
        access_token: string;
        refresh_token: string;
        token_type: "bearer";
        expires_in: {
            $numberDouble: string;
        };
    };
    message?: string;
}
