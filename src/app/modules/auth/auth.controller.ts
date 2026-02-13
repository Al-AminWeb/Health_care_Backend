import {catchAsync} from "../../shared/catchAsync";
import {authService} from "./auth.service";
import {sendResponse} from "../../shared/sendResponse";
import {Request, Response} from "express";
import status from "http-status";
import {tokensUtils} from "../../utils/tokens";


const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await authService.registerPatient(payload);
        const {accessToken, refreshToken, token, ...rest} = result;
        tokensUtils.setAccessTokenCookie(res, accessToken);
        tokensUtils.setRefreshTokenCookie(res, refreshToken);
        tokensUtils.setBetterAuthCookies(res, token);
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Patient registered succesfully",
            data: {
                ...rest,
                token,
                accessToken,
                refreshToken
            },
        })
    }
)


const loginUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await authService.loginUser(payload);
        const {accessToken, refreshToken, token, ...rest} = result;
        tokensUtils.setAccessTokenCookie(res, accessToken);
        tokensUtils.setRefreshTokenCookie(res, refreshToken);
        tokensUtils.setBetterAuthCookies(res, token);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "User logged in successfully",
            data: {
                ...rest,
                token,
                accessToken,
                refreshToken
            },
        })
    }
)

export const authController = {
    registerPatient,
    loginUser
}