import {ICreateDoctorPayload} from "./user.interface";
import {ROLE, speciality} from "../../../generated/prisma/client";
import {prisma} from "../../lib/prisma";
import {auth} from "../../lib/auth";
import * as trace_events from "node:trace_events";


const createDoctor = async (payload: ICreateDoctorPayload) => {
    const specialities: speciality[] = [];

    for (const specialityId of payload.specialties) {
        const speciality = await prisma.speciality.findUnique({
            where: {
                id: specialityId
            }
        })
        if (!speciality) {
            throw new Error("Invalid speciality")
        }
        specialities.push(speciality)
    }

    const userExists = await prisma.user.findUnique({
        where:
            {
                email: payload.doctor.email
            }
    })
    if (userExists) {
        throw new Error("User already exists")
    }

    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.doctor.email,
            password: payload.password,
            role: ROLE.DOCTOR,
            name: payload.doctor.name,
            needPasswordChange: true
        }
    })

    try {

        const result = await prisma.$transaction(async (tx) => {
            const doctorData = await tx.doctor.create({
                data: {
                    userId: userData.user.id,
                    ...payload.doctor,
                }
            })
            const doctorSpecialityData = specialities.map((speciality) => {
                return {
                    doctorId: doctorData.id,
                    specialityId: speciality.id
                }
            })
            await tx.doctorSpecialty.createMany({
                data: doctorSpecialityData
            })

            const doctor = await tx.doctor.findUnique({
                where: {
                    id: doctorData.id
                },
                select: {
                    id: true,
                    userId: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    registrationNumber: true,
                    experience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            image: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                    specialties: {
                        select: {
                            speciality: {
                                select: {
                                    title: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            })

            return doctor;
        })
        return result

    } catch (error) {
        // @ts-ignore
        console.log("transaction error", error.message);
        await prisma.user.delete({where: {id: userData.user.id}})
    }

}


export const userService = {
    createDoctor
}