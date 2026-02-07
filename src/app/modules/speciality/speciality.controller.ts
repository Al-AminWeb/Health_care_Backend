import {Request, Response} from "express";
import {specialityService} from "./speciality.service";
import {prisma} from "../../../lib/prisma";

const createSpeciality = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        // @ts-ignore
        const result = await specialityService.createSpeciality(payload)

        res.status(201).json({
            success: true,
            data: result,
            message: "Speciality created successfully"
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}


const getAllSpecialities = async (req: Request, res: Response) => {
    try {
        const specialities = await specialityService.getAllSpecialities();
        res.status(200).json({
            success: true,
            data: specialities,
            message: "Specialities fetched successfully"
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
                success: false,
                message: error.message
            }
        )
    }
}


const deleteSpeciality = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const result = await specialityService.deleteSpeciality(id as string);
        res.status(200).json({
            success: true,
            data: result,
            message: "Speciality deleted successfully"
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
                success: false,
                message: error.message
            }
        )
    }
}
export const specialityController = {
    createSpeciality,
    getAllSpecialities,
    deleteSpeciality
}