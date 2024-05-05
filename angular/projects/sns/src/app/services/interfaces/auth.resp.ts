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