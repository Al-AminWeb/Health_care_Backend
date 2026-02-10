import {NextFunction, Request, Response} from "express";
import z from "zod";


export const validateRequest = (zodSchema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const parsedResult = zodSchema.safeParse(req.body);

        if (!parsedResult.success) {
            console.error("Validation failed:", parsedResult.error.issues);
            return next(parsedResult.error);
        }

        req.body = parsedResult.data
        next();
    }
}