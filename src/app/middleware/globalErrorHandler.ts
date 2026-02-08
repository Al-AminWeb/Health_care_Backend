import {NextFunction, Request, Response} from "express";
import {envVars} from "../config/env";
import status from "http-status";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (envVars.NODE_ENV === "development") console.log("error from global error handler:", err)

    const statusCode: number = status.INTERNAL_SERVER_ERROR;

    const message: string = "Internal server error";


    res.status(statusCode).json({
            success: false,
            error: err.message,
            message: message
        }
    )
}