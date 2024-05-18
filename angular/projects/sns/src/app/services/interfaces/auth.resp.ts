export interface AccessTokenResponse {
    tokenType: string,
    accessToken: string,
    expiresIn: number,
    refreshToken: string
}

export interface InfoResponse {
    email: string,
    isEmailConfirmed: boolean
}

export interface AuthenticatedUserInfoResponse{
    id: number,
    name: string,
    email: string,
    email_verified_at: string,
    current_team_id: number,
    profile_photo_path: string,
    created_at: string,
    updated_at: string,
    two_factor_confirmed_at: string,
    profile_photo_url: string
}