import {NextFunction, Request, RequestHandler, Response} from "express";
import {specialityService} from "./speciality.service";
import {prisma} from "../../lib/prisma";
import {catchAsync} from "../../shared/catchAsync";
import {sendResponse} from "../../shared/sendResponse";
import status from "http-status";


const createSpeciality = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await specialityService.createSpeciality(payload);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        data: result,
        message: "Speciality created successfully"
    })
})

const getAllSpecialities = catchAsync(async (req: Request, res: Response) => {
    const result = await specialityService.getAllSpecialities();
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        data: result,
        message: "Specialities fetched successfully"
    })
})

const deleteSpeciality = catchAsync(async (req: Request, res: Response) => {
    const {id} = req.params
    const result = await specialityService.deleteSpeciality(id as string)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        data: result,
        message: "Speciality deleted successfully"
    })
})

export const specialityController = {
    createSpeciality,
    getAllSpecialities,
    deleteSpeciality
}