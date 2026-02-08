import {catchAsync} from "../../shared/catchAsync";
import {authService} from "./auth.service";
import {sendResponse} from "../../shared/sendResponse";
import {Request,Response} from "express";


const registerPatient = catchAsync(
    async (req:Request, res:Response)=> {
        const payload = req.body;

        const result = await authService.registerPatient(payload);

        sendResponse(res,{
            httpStatusCode:201,
            success:true,
            message:"Patient registered succesfully",
            data:result,
        })
    }
)

export const authController = {
    registerPatient
}