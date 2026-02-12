import {JwtPayload, SignOptions} from "jsonwebtoken";
import {jwtUtils} from "./jwt";
import {envVars} from "../config/env";
import {Response} from "express";
import {cookieUtils} from "./cookie";


const getAccessToken = (payload: JwtPayload) => {
    const accessToken = jwtUtils.createToken(
        payload,
        envVars.ACCESS_TOKEN_SECRET,
        {expiresIn: envVars.ACCESS_TOKEN_EXPIRATION} as SignOptions
    )
    return accessToken;
}

const getRefreshToken = (payload: JwtPayload) => {
    const refreshToken = jwtUtils.createToken(payload, envVars.REFRESH_TOKEN_SECRET, {expiresIn: envVars.REFRESH_TOKEN_EXPIRATION} as SignOptions)
    return refreshToken;
}

//creating access token cookie
const setAccessTokenCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, "accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
}


export const tokensUtils = {
    getAccessToken,
    getRefreshToken
}