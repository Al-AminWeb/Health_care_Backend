import {auth} from "../../lib/auth";
import {UserStatus} from "../../../generated/prisma/enums";
import {prisma} from "../../lib/prisma";
import {tokensUtils} from "../../utils/tokens";
import {role} from "better-auth/client";

interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}


const registerPatient = async (payload: IRegisterPatientPayload) => {
    const {name, email, password} = payload;


    const data = await auth.api.signUpEmail({
        // @ts-ignore
        body: {
            name,
            email,
            password,
        }
    })
    if (!data.user) {
        throw new Error("Failed to register user")
    }

    try {
        const patient = await prisma.$transaction(async (tx) => {

            const patientTx = await tx.patient.create({
                data: {
                    userId: data.user.id,
                    name: payload.name,
                    email: payload.email,
                }
            })
            return patientTx;
        })
        return {
            ...data,
            patient
        }
    } catch (error: any) {
        console.log("transaction error", error.message)

        await prisma.user.delete({where: {id: data.user.id}})
        throw error
    }
}


interface ILoginUserPayload {
    email: string;
    password: string;
}

const loginUser = async (payload: ILoginUserPayload) => {
    const {email, password} = payload;

    const data = await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is blocked");
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is deleted");
    }


    const accessToken = tokensUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    })

    const refreshToken = tokensUtils.getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    })
    return {
        ...data,
        accessToken,
        refreshToken
    };

}

export const authService = {
    registerPatient
    , loginUser
}