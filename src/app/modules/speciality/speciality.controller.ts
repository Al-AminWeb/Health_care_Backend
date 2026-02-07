import {NextFunction, Request, RequestHandler, Response} from "express";
import {specialityService} from "./speciality.service";
import {prisma} from "../../../lib/prisma";
import {catchAsync} from "../../shared/catchAsync";

const createSpeciality =catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await specialityService.createSpeciality(payload);
    res.status(201).json({
        success: true,
        data: result,
        message: "Speciality created successfully"
    })
})




const getAllSpecialities = catchAsync(
    async (req:Request,res:Response)=>{
        const result = await specialityService.getAllSpecialities();
        res.status(200).json({
            success: true,
            data: result,
            message: "Specialities fetched successfully"
        })
    }
)


const deleteSpeciality = catchAsync(async (req:Request,res:Response)=>[p{
    const {id} = req.params
    const result = await specialityService.deleteSpeciality(id as string)
    res.status(200).json({
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