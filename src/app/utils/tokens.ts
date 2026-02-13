import {JwtPayload, SignOptions} from "jsonwebtoken";
import {jwtUtils} from "./jwt";
import {envVars} from "../config/env";
import {Response} from "express";
import {cookieUtils} from "./cookie";
import ms from "ms";


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
        maxAge: 60 * 60 * 60 * 24 * 7,
        path: "/"
    })
}

const setRefreshTokenCookie = (res: Response, token: string) => {

    cookieUtils.setCookie(res, "refreshToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 60 * 24 * 7,
        path: "/"

    })
}


const setBetterAuthCookies = (res: Response,token:string) => {

    cookieUtils.setCookie(res, "better-auth.session_token" ,token,{
       httpOnly: true,
       secure: true,
       sameSite: "none",
       maxAge:60* 60*60*24,
       path: "/"
    })
}

export const tokensUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthCookies
}