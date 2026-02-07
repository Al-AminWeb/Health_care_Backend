import {NextFunction, Request, RequestHandler, Response} from "express";


export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                    success: false,
                    error: error.message,
                    message: "failed to fetch"

                }
            )
        }
    }
}

