import {prisma} from "../../lib/prisma";
import {speciality} from "../../../generated/prisma/client";


const createSpeciality = async (payload: speciality): Promise<speciality> => {
    const speciality = await prisma.speciality.create({
        data: payload
    })
    return speciality;
}


const getAllSpecialities = async (): Promise<speciality[]> => {
    const specialities = await prisma.speciality.findMany();
    return specialities;
}

const deleteSpeciality = async (id: string): Promise<speciality> => {

    const speciality = await prisma.speciality.delete({
        where: {id}
    })
    return speciality;
}
export const specialityService = {
    createSpeciality,
    getAllSpecialities,
    deleteSpeciality
}