import {catchAsync} from "../../shared/catchAsync";
import {Request, Response} from "express";
import {sendResponse} from "../../shared/sendResponse";
import status from "http-status";
import {doctorService} from "./doctor.service";


const getAllDoctors = catchAsync(async (req: Request, res: Response) => {


    const result = await doctorService.getAllDoctors();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor created successfully",
        data: result
    })
})


export const doctorController = {
    getAllDoctors
}