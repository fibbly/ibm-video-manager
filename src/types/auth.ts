export interface GetAccessTokenResponse {
    success: boolean;
    data: {
        access_token?: string;
        refresh_token?: string;
        token_type?: "bearer";
        expires_in?: string;
        error?: string;
        error_description?: string;
    };
}
