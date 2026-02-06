import {Request, Response} from "express";
import {specialityService} from "./speciality.service";

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
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}

export const specialityController = {
    createSpeciality
}